import React, { useEffect, useRef, useState } from "react";
import { S3_BUCKET, s3 } from "../../config/awsConfig";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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

const ImageUpload = () => {
	const imagesRef = useRef([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const fileTypes = ["JPG", "PNG", "GIF", "webp"];
	const [open, setOpen] = useState(true);
	const [support, setSupport] = useState(true);
	const [active, setActive] = useState(true);
	const [reConnect, setReConnect] = useState(false);
	const [imageProcessing, setImageProcessing] = useState(false);
	const [enhanceImages, setEnhanceImages] = useState(() => []);

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
		shouldReconnect: (closeEvent) => {
			console.log("Reconnecting....");
			return reConnect === true;
		},
		reconnectAttempts: 10,
		reconnectInterval: 3000,
	});

	useEffect(() => {
		if (lastMessage !== null) {
			const imageName = lastMessage.data;
			// Stop Image process loader

			// Fetch Enhanced image from AWS
			const fetchEnhancedImage = async () => {
				const result = await getObject(imageName);
				setEnhanceImages((prev) => [...prev, result]);
				setImageProcessing(false);
				// console.log(enhanceImages);
			};

			fetchEnhancedImage();
		}
	}, [lastMessage]);

	const delay = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	// Get presigned url form AWS
	const getObject = async (keyName) => {
		await delay(500);

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
			// console.log("The URL is", url);

			return url;
		} catch (err) {
			console.log("Error copying object:", err);
			throw err;
		}
	};

	// Handle Files uploaded by client
	// @store in selectedFiles UseState
	const handleFiles = (files) => {
		if (!files) return;
		console.log("files", files);

		if (files === "File type is not supported") {
			window.alert("file not supported");
			setSupport(false);
			return;
		}

		const selected = [...selectedFiles];
		Array.from(files).filter((file) => {
			const { name } = file;
			const isDuplicate = selected.some((f) => f.name === name);
			if (!isDuplicate) {
				selected.push(file);
			}
			return !isDuplicate;
		});

		// console.log("selected", selected);
		setSelectedFiles(selected);
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
				Supports JPG, JPEG or PNG
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
		sendJsonMessage(data);

		// changes value of state tor rerender view
		setActive(true);
		setSelectedFiles([]);
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
