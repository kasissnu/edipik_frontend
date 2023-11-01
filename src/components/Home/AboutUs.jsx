import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import bgImage from "../../assets/images/about-us-bg.png";
import Marquee from "react-fast-marquee";

const AboutUs = () => {
	return (
		<>
			<Box py={{ xs: 4, md: 8 }} id="about-us" className="bg-gray">
				<Grid container spacing={5} className="m-0 w-full">
					<Grid
						item
						xs={12}
						md={6}
						pb={5}
						className="pl-0 lg:pl-5 xl:pl-0 flex justify-center items-center flex-col mb-0 lg:mb-10"
					>
						<Box className="px-10 hidden lg:block w-full h-full overflow-hidden">
							<Marquee autoFill={true}>
								<Typography className="text-primary-950 font-sans font-normal leading-10 text-2xl lg:text-[3rem] pb-4 m-0 uppercase pr-14">
									Temperature White- Balance Luminance Shadows
									Texture
								</Typography>
							</Marquee>
							<Marquee autoFill={true} direction="right">
								<Typography className="text-primary-950 font-sans font-normal leading-10 text-2xl lg:text-[3rem] pb-4 m-0 uppercase pr-14">
									Saturation Exposure Vibrance Whites Contrast
									Noise
								</Typography>
							</Marquee>
						</Box>
						<Box className="py-10 mb-20 sm:mb-0 relative md:flex lg:block justify-center w-[21.8rem] lg:w-[30rem] xl:w-[44rem] h-[12.5rem] lg:h-[22rem]">
							<img
								src={bgImage}
								alt="about-us"
								className="object-contain opacity-30 lg:rotate-[-12deg] w-[21.8rem] lg:w-[30rem] xl:w-[44rem] h-[12.5rem] lg:h-[22rem]"
							/>
							<Box
								className="absolute top-1/2 left-1/2 w-[21.8rem] lg:w-[30rem] xl:w-[40rem] h-[12.5rem] lg:h-[22rem] mt-10 flex justify-center items-center flex-col"
								sx={{ transform: "translate(-50%, -50%)" }}
							>
								<Typography
									variant="h2"
									className="font-mistrully rotate-[-12deg] text-primary-950 text-[2rem] leading-10 lg:text-[3.75rem] xl:text-[5rem]"
								>
									By Photographers ,
								</Typography>
								<Typography
									variant="h2"
									className="font-mistrully rotate-[-12deg] text-primary-950 text-[2rem] leading-10 lg:text-[3.75rem] xl:text-[4.6rem] mt-3 lg:mt-16"
								>
									For Photographers
								</Typography>
							</Box>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						className="bg-columbiaBlue text-primary-950 relative p-10 h-full w-full"
					>
						{/* <Box className="max-h-[780px] max-w-full overflow-hidden">
							<img
								src={borderImage}
								alt="border-img"
								className="object-fit"
							/>
						</Box> */}
						{/* <Box className="absolute top-0 left-0 h-full w-full z-50 hidden sm:block">
							<img
								src={borderImage}
								alt="border"
								width={"100%"}
								height={"100%"}
							/>
						</Box> */}
						<Box className="border-4 border-primary-950 border-solid px-5 py-10 h-full xl:h-[528px]">
							<Typography
								variant="h2"
								sx={{
									sm: { variant: "body1" },
									md: { variant: "h4" },
								}}
								textAlign="center"
								pb={2}
								className="font-mistrully text-[2.4rem] md:text-[2.8rem] lg:text-[3.4rem]"
							>
								Who We Are
							</Typography>
							<Typography
								variant="body1"
								textAlign={{ xs: "left" }}
								className="font-sans text-[1.2rem] md:text-[1.3rem] lg:text-[1.5rem] leading-8 xl:leading-10 font-light"
							>
								At Edipik, we understand the challenges that
								professional photographers face in their daily
								workflow, and that's why we've created a
								software solution that is tailored to your
								specific needs. Our software is designed to help
								you automate your editing process, improve your
								efficiency, and provide you with personalized
								style options. It works on exposure, white
								balance, contrast, colour, noise, skin tone, and
								background enhancement. We're adding more like
								subject masking...
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Box className="px-10 pt-10 block lg:hidden">
					<Marquee autoFill={true}>
						<Typography className="text-primary-950 font-sans font-normal leading-10 text-3xl lg:text-[3rem] pb-4 m-0 uppercase pr-14">
							Temperature White- Balance Luminance Shadows Texture
						</Typography>
					</Marquee>
					<Marquee autoFill={true} direction="right">
						<Typography className="text-primary-950 font-sans font-normal leading-10 text-3xl lg:text-[3rem] pb-4 m-0 uppercase pr-14">
							Saturation Exposure Vibrance Whites Contrast Noise
						</Typography>
					</Marquee>
				</Box>
			</Box>
		</>
	);
};

export default AboutUs;
