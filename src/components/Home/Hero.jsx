import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ImageComparisonSlider from "./ImageComparisonSlider";
import HeroBg from "../../assets/images/hero-bg.webp";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import CustomButton from "../Common/CustomButton";

const Hero = () => {
	return (
		<>
			<Box
				className="text-white bg-primary-950 relative w-full h-[calc(100vh-73.74px)] min-h-[667px] sm:py-6 md:py-12 overflow-hidden"
				// py={{ xs: 4, md: 8 }}
			>
				<div className="top-[-8rem] flex justify-center align-middle relative scale-x-[-1]">
					<div className="w-full sm:w-[690px] h-full sm:h-[900px] rotate-90 absolute">
						<img
							src={HeroBg}
							alt="hero bg"
							className="object-fill w-full h-full z-50 opacity-40"
						/>
					</div>
				</div>
				<Container maxWidth="xl">
					<Grid
						container
						spacing={12}
						alignItems="center"
						justifyContent={"center"}
						className="h-full lg:px-10"
					>
						<Grid item xs={12} sm={8} md={8} lg={8} 
						// className="py-10"
						>
							<div className="mb-[2rem]">
							<Button
								component={Link}
								to="/"
								className="text-white hero-logo"
							>
								<img
									src={logo}
									alt="logo"
									className="h-[100px] mb-5"
								/>
							</Button>
							</div>
							<div className="mb-[2rem]">
							<Typography
								variant="h4"
								fontWeight={"600"}
								fontSize={{
									sm: "1.8rem",
									md: "2.5rem",
									lg: "3.2rem",
								}}
								className="font-playfair text-left"
							>
								for
								<span className="text-secondary-600 px-2">
									Professional Photographers
								</span>
								to improve their workflow with
								<span className="text-secondary-600 px-2">
									AI
								</span>
							</Typography>
							</div>
							<Box className="mb-[2rem]">
							<Typography
								variant="subtitle1"
								letterSpacing={1}
								textAlign={"left"}
								className="text-lg md:text-[1.4rem]"
							>
								The premier AI-powered photo editing software
								for professional photographers. Edipik is
								specifically designed to save you time, increase
								your productivity, and help you create stunning
								photo edits with ease.
							</Typography>
							</Box>
							<Box className="flex justify-center">
								<CustomButton
									variant="contained"
									size="small"
									sx={{
										margin: "auto",
										display: "flex",
										fontWeight: "500",
										fontSize: "14px",
									}}
									component={Link}
									to={"/user/signin"}
									color="bg-[#d1d5db] hover:bg-[#9ca3af]"
									className="px-8 py-2 m-auto block lg:hidden"
								>
									<Typography className="text-black text-[17px]">
										Sign in{" "}
									</Typography>
								</CustomButton>
							</Box>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}
							md={4}
							lg={4}
							justifyContent={"end"}
							className="sm:block hidden"
						>
							<Box className="flex justify-end">
							<ImageComparisonSlider />
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Hero;
