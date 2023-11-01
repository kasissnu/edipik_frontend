import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../Common/CustomButton";
import { Link } from "react-router-dom";
import demoVideo from "../../assets/video/demo";

const VideoBlock = () => {
	return (
		<Box
			className="bg-primary-950"
			py={{ xs: 4, md: 8 }}
		>
			<Container>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					spacing={8}
				>
					<Grid item md={12} lg={6}>
						<Box className="xl:!max-w-sm !max-w-full m-auto">
							<Typography
								variant="h4"
								fontWeight={"bolder"}
								className="pb-3 !font-extrabold text-secondary-600"
							>
								Your personalized editing style powered by AI
							</Typography>
							<Typography
								variant="body1"
								// fontWeight={"400"}
								className="text-left text-white"
								letterSpacing={1}
							>
								Imagen analyzes your previous photo edits to create
								your Personal AI Profile. You can then apply the
								profile to your Lightroom Classic catalog at a less
								than 1/2 second per photo. The AI Profile will know
								what to adjust; whether it’s white balance,
								exposure, color correction, and more.
							</Typography>
							<Box className="!pt-5">
								<CustomButton
									variant="contained"
									className="!inline-block rounded-md text-white !py-3 !px-8"
									component={Link}
									to={"/user/signup"}
								>
									Sign Up
								</CustomButton>
							</Box>
						</Box>
					</Grid>
					<Grid item md={12} lg={6}>
						<Box className="max-w-full">
							<video
								className="w-full"
								height={"auto"}
								loop
								autoPlay
								muted
							>
								<source src={demoVideo} type="video/mp4" />
							</video>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default VideoBlock;
