import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../Common/CustomButton";

const CTABlock = () => {
	return (
		<Box className="bg-primary-50 sm:px-20 px-0 pt-20">
			<Container>
				<Grid
					container
					px={{ lg: 20 }}
					direction={"column"}
					justifyContent="center"
				>
					<Box>
						<Typography
							sx={{
								fontWeight: 500,
								letterSpacing: ".1rem",
								color: "inherit",
								textDecoration: "none",
								fontSize: "50px",
							}}
							className="!text-primary-950 !mb-8"
						>
							Put Edipik to work for you
						</Typography>
						<Box className="!mb-4">
							<CustomButton
								variant="contained"
								mt={4}
								sx={{
									padding: "0.5rem 1.7rem",
								}}
							>
								Start today - get 1,000 AI edits on us!
							</CustomButton>
						</Box>
					</Box>
					<Box className="bg-primary-900 p-10 translate-y-6">
						<Box>
							<Typography className="text-white">
								Join the thousands of professiobnal
								photographers who have already made the switch
								to Edipik. Experience the power of automated
								photo editing. See for yourself how Edipik can
								save your time, increase your productivity, and
								help you create stunning photo edits with ease.
							</Typography>
							<Typography className="text-white">
								Don't miss out on this amazing opportunity to
								streamline your workflow and take your photo
								editing to the next level . Signup for Edipik
								today and experience future of photo editing.
							</Typography>
						</Box>
					</Box>
				</Grid>
			</Container>
		</Box>
	);
};

export default CTABlock;
