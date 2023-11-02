import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import footerBgImg from "../../assets/images/footer-bg.svg";
import CustomButton from "./CustomButton";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.svg";
import linkedIn from "../../assets/images/linkedin.svg";
import youtube from "../../assets/images/youtube.svg";
import boxshadow from "../../assets/images/box-shadow.svg";
import { checkAuth } from "../../utils/checkAuth";

const Footer = () => {
  
	const navigate = useNavigate();

	const handleRedirect = (id) => {
		navigate("/");
		setTimeout(() => {
			const aboutSection = document.getElementById(id);
			if (aboutSection) {
				window.scrollTo({
					top: aboutSection.offsetTop,
					behavior: "smooth",
				});
			}
		}, [200]);
	};
	const handleScrollTOp = () => {
		window.scrollTo(0, 0);
	};

	const socialLinks = [
		{
			name: "instagram",
			icon: instagram,
			link: "https://instagram.com",
		},
		{ name: "facebook", icon: facebook, link: "https://facebook.com" },
		{ name: "youtube", icon: youtube, link: "https://youtube.com" },
		{ name: "linkedin", icon: linkedIn, link: "https://linkedIn.com" },
	];

	return (
		<>
			<Box
				pt={10}
				pb={3}
				// px={{ lg: 20, sm: 2, xs: 2 }}
				className="mt-auto bottom-0 bg-primary-950 relative overflow-hidden"
			>
				<Box className="absolute -top-1/2 lg:-top-1/3 -left-[20px] h-full scale-x-[-1] rotate-180">
					<img
						src={footerBgImg}
						alt="footer"
						className="w-full h-full opacity-50"
					/>
				</Box>
				<Box className="w-full h-full flex justify-center mb-10 overflow-hidden">
					<Box className="max-w-full xl:max-w-7xl h-full mx-10 xl:mx-0 bg-columbiaBlue p-10 rounded-xl text-primary-950 z-50">
						<Typography
							variant="h2"
							className="mb-5 font-semibold text-[2.5rem] md:text-[3.6rem] font-playfair"
						>
							Hire Your Personalised AI Editor
						</Typography>
						<Typography className="text-xl leading-8">
							Join the thousands of professional photographers who
							have already made the switch to Edipik. Experience
							the power of automated photo editing. See for
							yourself how Edipik can save you time, increase your
							productivity, and help you create stunning photo
							edits with ease. Don't miss out on this amazing
							opportunity to streamline your workflow and take
							your photo editing to the next level. Sign up for
							Edipik today and experience the future of photo
							editing!
						</Typography>
						<Box className="w-full flex justify-center items-center">
							{/* <CustomButton className="text-primary-950 mt-5 text-lg px-4">
								Start today - get 1,000 AI edits on us!
							</CustomButton> */}
							{!checkAuth() ? (
								<CustomButton 							
								variant="contained"
								onClick={()=>{
									window.scrollTo({ top: 0, behavior: 'smooth' });
									navigate("user/signin")}}
 								className="text-primary-950 mt-5 text-lg px-4"
							>
								<Typography className="text-black text-[17px]">
										Sign in{" "}
								</Typography>
							</CustomButton>
							):(<></>)}
						</Box>
					</Box>
				</Box>
				<Container className="relative z-10">
					<Grid
						container
						rowSpacing={3}
						pb={3}
						className="sm:justify-between justify-center items-start"
					>
						<Grid item sm={3} md={3} lg={2}>
							<Button
								component={Link}
								to="/"
								sx={{ color: "#fff" }}
								onClick={handleScrollTOp}
								className="z-10"
							>
								<img src={logo} alt="logo" height="55px" />
							</Button>
						</Grid>
						<Grid
							item
							sm={10}
							md={7.9}
							lg={8}
							className="drop-shadow-xl"
						>
							<Grid container spacing={4}>
								<Grid
									item
									xs="auto"
									sm="auto"
									md="auto"
									// wrap="wrap"
								>
									<Button
										sx={{
											display: "flex",
											justifyContent: "flex-end",
										}}
										className="!text-white text-lg"
										onClick={() =>
											handleRedirect("product-block")
										}
									>
										Product
									</Button>
									<Button
										sx={{
											my: 1,
											display: "flex",
											justifyContent: "flex-end",
										}}
										className="!text-white text-lg"
										to={"/"}
										component={Link}
										onClick={handleScrollTOp}
									>
										AI Profiles
									</Button>
									<Button
										sx={{
											my: 1,
											display: "flex",
											justifyContent: "flex-start",
										}}
										className="!text-white text-lg"
										to={"/pricing"}
										component={Link}
										onClick={handleScrollTOp}
									>
										Pricing
									</Button>
								</Grid>
								<Grid item xs="auto" sm="auto" md="auto">
									<Button
										sx={{
											display: "flex",
											justifyContent: "flex-end",
										}}
										className="!text-white text-lg"
										onClick={() =>
											handleRedirect("about-us")
										}
									>
										About Us
									</Button>
									<Button
										sx={{
											my: 1,
											display: "flex",
											justifyContent: "flex-end",
										}}
										className="!text-white text-lg"
										to={"/"}
										component={Link}
										onClick={handleScrollTOp}
									>
										Contact Us
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid item sm={12} md={1.1} lg={1}>
							<Grid
								container
								spacing={2}
								justifyContent={{ md: "end" }}
							>
								{socialLinks.map((socialLink, index) => (
									<Grid item key={`social-${index}`}>
										<Box
											sx={{
												width: "30px",
												height: "30px",
											}}
											className="items-center shadow-md flex justify-center shadow-black"
										>
											<Button
												href={socialLink.link}
												sx={{ color: "inherit" }}
											>
												<img
													src={socialLink.icon}
													alt={socialLink.name}
													width={36}
													height={36}
												/>
											</Button>
										</Box>
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
				</Container>
				<Box className="absolute bottom-[-52rem] lg:left-[20%] opacity-60">
					<img
						src={boxshadow}
						alt="box shadow"
						width={1000}
						height={1000}
					/>
				</Box>
			</Box>
		</>
	);
};

export default Footer;
