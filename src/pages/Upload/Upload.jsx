import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ImageUpload from "../../components/Home/ImageUpload";

const Upload = () => {
	return (
		<>
			<Box className="mx-3 mt-10 mb-20">
				<Container className="!flex flex-col items-center">
					<Typography
						className="!mb-10 "
						style={{ fontWeight: 500 }}
						textAlign={{ xs: "left", sm: "center" }}
						typography={{
							xs: "h4",
							md: "h3",
						}}
					>
						Upload Your Images
					</Typography>
					<Typography variant="h6">
						Enhance images using AI model
					</Typography>
				</Container>
			</Box>
			<ImageUpload />
		</>
	);
};

export default Upload;
