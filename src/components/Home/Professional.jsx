import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import bgImage from "../../assets/images/professional.png";

const Professional = () => {
	return (
		<>
			<Box py={{ xs: 8, md: 12 }} className="bg-gray">
				<Container>
					<Grid item className="w-full h-full relative">
						<Box className="absolute top-0 sm:top-[-30px] left-0">
							<img
								src={bgImage}
								alt="professional-background"
								className="w-full h-full object-contain opacity-40"
							/>
						</Box>
						<Box className="z-10 relative text-primary-950">
							<Typography
								variant="h4"
								textAlign="center"
								fontWeight={"bolder"}
								className="font-mistrully leading-[3rem] lg:leading-10 text-4xl md:text-[2.5rem] lg:text-[4rem]"
							>
								Trusted by professionals worldwide
							</Typography>
							<Typography
								variant="body1"
								textAlign="center"
								mt={{
									sm: 4,
									xs: 2,
								}}
								className="text-[1.2rem] lg:text-[1.6rem] lg:pt-5"
							>
								Thousands of professional photographers trust
								Imagen to start their Lightroom editing process
								from an advanced point so they can spend more
								time doing what they love.
							</Typography>
						</Box>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Professional;
