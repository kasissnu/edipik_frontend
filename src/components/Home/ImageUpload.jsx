/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { S3_BUCKET, s3 } from "../../config/awsConfig";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { useNotification } from "../../utils/Hooks/useNotification";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	ImageList,
	ImageListItem,
	LinearProgress,
} from "@mui/material";
import { Container } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import ImageIcon from "@mui/icons-material/Image";
import { v4 as uuidv4 } from "uuid";
import { getApiUrl } from "../../utils/getApiUrl";
import useWebSocket from "react-use-websocket";
import AWS from 'aws-sdk';

const ImageUpload = () => {
	const imagesRef = useRef([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const fileTypes = ["JPG"];
	const [open, setOpen] = useState(true);
	const [support, setSupport] = useState(true);
	const [active, setActive] = useState(true);
	const [reConnect, setReConnect] = useState(false);
	const [imageProcessing, setImageProcessing] = useState(false);
	const [enhanceImages, setEnhanceImages] = useState(() => []);
	const [download, setDownload] = useState(false);
	const [sessionName, setSessionName] = useState('')
	const [enhanceImagesCount, setEnhanceImagesCount] = useState(0);
	const [filesCount, setFilesCount] = useState(0);
	const [downloading, setDownloading] = useState(false);
	const { showNotification } = useNotification();
	const [images, setImages] = useState([]);
	

	const [visible, setVisible] = useState(6);

	const showMoreItems = () => {
		setVisible((prevValue) => prevValue + 6);
	};

	const handleResetValue = () => {
		setEnhanceImages(() => []);
		setVisible(6);
	};

	// Create a websocket connection with backend
	const socketUrl = `ws://${getApiUrl("WS")}/celery-results`;
	const { sendJsonMessage, lastMessage } = useWebSocket(socketUrl, {
		onOpen: () => {
			// setDownload(false);
			console.log("connection opened")
		},
		onMessage: (event) => {
			const message = event.data;
			console.log("Received message:", message);
			setImages((prevMessage)=>[...prevMessage, message]);
			// Handle the message as needed
		},
		onClose: () => {
			setDownload(true);
			console.log("connection closed")
		},
		shouldReconnect: (closeEvent) => {
			console.log("Reconnecting....");
			return reConnect === true;
		},
		reconnectAttempts: 10,
		reconnectInterval: 3000,
	});



	// useEffect(() => {
	// 	console.log("lastMessage*****", lastMessage)
	// 	if (lastMessage !== null) {
	// 		const imageName = lastMessage.data;
	// 		console.log("imageName****", imageName)
	// 		// Stop Image process loader

	// 		// Fetch Enhanced image from AWS
			// const fetchEnhancedImage = async () => {
			// 	const result = await getObject(imageName);
			// 	setEnhanceImages((prev) => [...prev, result]);
			// 	setImageProcessing(false);
			// 	setEnhanceImagesCount(enhanceImagesCount + 1);
			// };

			// fetchEnhancedImage();
	// 	}
	// }, [lastMessage]);

	useEffect(() => {
		console.log("images*****", images);
		console.log("files count", filesCount);
		if(images.length===filesCount && filesCount!==0){
			images.map((imageName)=>{
				const fetchEnhancedImage = async () => {
					const result = await getObject(imageName);
					setEnhanceImages((prev) => [...prev, result]);
					setImageProcessing(false);
					setEnhanceImagesCount(enhanceImagesCount + 1);
				};
	
				fetchEnhancedImage();
			});
		}
		// if (images !== null) {
		// 	// Stop Image process loader

		// 	// Fetch Enhanced image from AWS
		// 	const fetchEnhancedImage = async () => {
		// 		const result = await getObject(images);
		// 		setEnhanceImages((prev) => [...prev, result]);
		// 		setImageProcessing(false);
		// 		setEnhanceImagesCount(enhanceImagesCount + 1);
		// 	};

		// 	fetchEnhancedImage();
		// }
	}, [images, filesCount]);



	const delay = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	// Get presigned url form AWS
	const getObject = async (keyName) => {
		await delay(1000);

		const copyParams = {
			Bucket: S3_BUCKET,
			CopySource: S3_BUCKET + "/" + keyName,
			Key: keyName,
			ContentType: "image/jpeg", // set the content type
			ContentDisposition: "inline", // set the content disposition
		};

		try {
			await s3.copyObject(copyParams).promise();
			// console.log("Object copied successfully");

			const params = {
				Bucket: S3_BUCKET,
				Key: keyName,
				Expires: 86400,
			};

			const url = await s3.getSignedUrlPromise("getObject", params);
			console.log(url);

			return url;
		} catch (err) {
			console.log("Error copying object:", err);
			throw err;
		}
	};

	const handleFiles = (files) => {
		if (!files) return;
	  
		// Check for PNG files and show an alert
		const hasPngFiles = Array.from(files).some((file) => {
		  const { name } = file;
		  const extension = name.split('.').pop().toUpperCase();
		  return extension === "PNG";
		});
	  
		if (hasPngFiles) {
		  window.alert("PNG files are not supported. Please upload only JPG files.");
		  setSupport(false);
		  return;
		}
	  
		// Filter out only JPG files
		const selected = [...selectedFiles];
		const jpgFiles = Array.from(files).filter((file) => {
		  const { name } = file;
		  const extension = name.split('.').pop().toUpperCase();
		  return extension === "JPG";
		});
	  
		// Add the filtered JPG files to the selectedFiles state
		Array.from(jpgFiles).forEach((file) => {
		  const { name } = file;
		  const isDuplicate = selected.some((f) => f.name === name);
		  if (!isDuplicate) {
			selected.push(file);
		  }
		});
	  
		setSelectedFiles(selected);
		setImages([]);
		setFilesCount(selected.length);
	  };

	const DropZone = (
		<Box
			className="text-[#3d3d3d] text-center rounded-xl border-2 border-[#cad0db] border-dashed"
			p={{ xs: 4, sm: 4, md: 6 }}
		>
			<ImageIcon fontSize="large" />
			<Typography className="font-black">
				Drop your images here or,{" "}
				<span className="text-[#4287f5]">browse</span>
			</Typography>
			<Typography className="text-[#cad0db] text-center">
				Supports JPG
			</Typography>
			{selectedFiles.length > 0 && (
				<Box>
					<Typography p={3} fontWeight={"600"} color="#bfbfbf">
						{selectedFiles.length}
						{selectedFiles.length === 1 ? " file" : " files"}{" "}
						Selected
					</Typography>
				</Box>
			)}
		</Box>
	);
	const DropMessage = (
		<Typography sx={{ fontWeight: "700" }}>Drop here...</Typography>
	);

	// Upload File to AWS using SDK
	const uploadFile = (file, folderName) => {
		const params = {
			Bucket: S3_BUCKET,
			Key: `${folderName}/${file.name}`,
			Body: file,
		};

		return s3.upload(params).promise();
	};

	// Handle all processing
	// Create a folder in AWS, upload images, send data to websocket
	const handleUpload = async () => {
		setActive(false);
		handleResetValue();
		const folderName = `session-${uuidv4()}`;
		setSessionName(folderName);
		const uploadFiles = [];
		// Create a folder in AWS S3
		await s3
			.putObject({
				Bucket: S3_BUCKET,
				Key: `${folderName}/`,
				Body: "",
			})
			.promise();

		// Upload the selected files to the newly created folder in AWS S3
		const uploadPromises = selectedFiles.map((file) => {
			uploadFiles.push(file.name);
			return uploadFile(file, folderName);
		});

		await Promise.all(uploadPromises);

		const data = { folderName, uploadFiles };

		// send data to websocket
		setReConnect(true);
		setSelectedFiles([]);
		sendJsonMessage(data);

		// changes value of state tor rerender view
		setActive(true);
		setSelectedFiles([]);
		setEnhanceImagesCount(0);
		setImageProcessing(true);
	};

	const handleRemoveFile = (e) => {
		setSelectedFiles([]);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleImageLoad = (index) => {
		const image = imagesRef.current[index];
		if (image) {
			// console.log(image);
			image.setAttribute("crossorigin", "");
		}
	};


	const handleDownload = () => {
		// Create an S3 instance
		const s3 = new AWS.S3();
		setDownloading(true);

		// Get the S3 object
		try {
			s3.getObject(
				{
					Bucket: S3_BUCKET,
					Key: sessionName + "/enhanced_images.zip",
				},
				(err, data) => {
					if (err) {
						console.error('Error downloading the zip file:', err);
						setDownloading(false);
						showNotification("Error downloading the zip file", "error");
						return;
					}
					console.error('data :', data);

					// Create a download link and trigger the download
					const url = window.URL.createObjectURL(new Blob([data.Body]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'enhanced-images.zip'); // Replace with your desired file name
					document.body.appendChild(link);
					link.click();
					setDownloading(false)
				}
			);
		}
		catch {
			console.log("error while downloading");
			setDownloading(false);
			showNotification("Error downloading the zip file", "error");
		}
	};

	return (
		<>
			<Box className="bg-primary-50 py-20">
				{active && (
					<Container maxWidth="md">
						<Box
							sx={{
								backgroundColor: "white",
								borderRadius: "20px",
								boxShadow:
									"0px 5px 10px 0px rgba(0, 0, 0, 0.2)",
							}}
							p={{ md: 2, xs: 1 }}
						>
							<Box
								sx={{
									margin: "auto",
									borderRadius: "20px",
									backgroundColor: "white",
								}}
								p={{ xs: 1 }}
							>
								<FileUploader
									multiple={true}
									handleChange={handleFiles}
									onTypeError={handleFiles}
									name="file"
									types={fileTypes}
									children={DropZone}
									hoverTitle={DropMessage}
									className="upload-section"
									dropMessageStyle={{
										backgroundColor: "#d5d7db",
										display: "inline-block",
										position: "absolute",
										opacity: 1,
									}}
									maxSize={1000}
								/>
							</Box>
						</Box>
						{!support && (
							<Box>
								<Dialog
									open={open}
									onClose={handleClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											File not supported.
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose}>
											Disagree
										</Button>
										<Button onClick={handleClose} autoFocus>
											Agree
										</Button>
									</DialogActions>
								</Dialog>
							</Box>
						)}
						<Container sx={{ padding: "40px", width: "310px" }}>
							{selectedFiles.length > 0 && (
								<Grid container spacing={1}>
									<Grid item md={4} textAlign="center">
										<Button
											variant="contained"
											onClick={handleUpload}
										>
											Upload
										</Button>
									</Grid>
									<Grid item md={8} textAlign="center">
										<Button
											variant="contained"
											onClick={handleRemoveFile}
											color="error"
										>
											Remove files
										</Button>
									</Grid>
								</Grid>
							)}
						</Container>
					</Container>
				)}
				{!active && (
					<Container>
						<Box
							m={4}
							sx={{
								border: "1px solid #cad0db",
								borderRadius: "10px",
								padding: "20px 20px",
								margin: "auto",
							}}
							maxWidth="md"
						>
							<Typography
								mb={2}
								fontWeight={"900"}
								color="#262625"
							>
								Uploading...{" "}
							</Typography>
							<LinearProgress
								color="primary"
								variant="indeterminate"
								sx={{ borderRadius: "20px" }}
								height="3px"
							/>
						</Box>
					</Container>
				)}
				{imageProcessing && (
					<Container>
						<Box
							m={4}
							sx={{
								border: "1px solid #cad0db",
								borderRadius: "10px",
								padding: "20px 20px",
								margin: "auto",
							}}
							maxWidth="md"
						>
							<Typography
								mb={2}
								fontWeight={"900"}
								color="#262625"
							>
								processing Images please wait...{" "}
							</Typography>
							<LinearProgress
								color="primary"
								variant="indeterminate"
								sx={{ borderRadius: "20px" }}
								height="3px"
							/>
						</Box>
					</Container>
				)}

				{(filesCount > 0 && enhanceImages.length === filesCount) && (
					<Box className="flex justify-center">
						<Button
							variant="contained"
							className="m-4 bg-secondary-600"
							onClick={handleDownload}
						>
							Download Zip &nbsp;&nbsp;
							{downloading ? (
								<CircularProgress size={'1.2rem'} color="primary" />
							) : (<></>)}
						</Button>

					</Box>

				)}
				{enhanceImages.length !== 0 && (
					<Container>
						<Box sx={{ margin: "auto" }}>
							<ImageList variant="masonry" cols={3} gap={8}>
								{enhanceImages
									?.slice(0, visible)
									.map((img, index) => (
										<ImageListItem
											key={`image-${img}-${index}`}
										>
											<img
												ref={(el) =>
												(imagesRef.current[index] =
													el)
												}
												src={`${img}`}
												srcSet={`${img}`}
												onLoad={() =>
													handleImageLoad(index)
												}
												crossOrigin="anonymous"
											/>
										</ImageListItem>
									))}
							</ImageList>
							{visible < enhanceImages.length && (
								<Box className="flex justify-center mt-20">
									<Button
										variant="contained"
										onClick={showMoreItems}
									>
										Load more
									</Button>
								</Box>
							)}
						</Box>
					</Container>
				)}
			</Box>
		</>
	);
};

export default ImageUpload;
