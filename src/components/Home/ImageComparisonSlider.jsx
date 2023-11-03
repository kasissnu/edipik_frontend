import React from "react";
import { Box } from "@mui/material";
import after from "../../assets/images/after.jpeg";
import before from "../../assets/images/before.jpeg";
import {
	ReactCompareSlider,
	ReactCompareSliderImage,
} from "react-compare-slider";

const ImageComparisonSlider = () => {
	return (
		<Box
			sx={{
				height: {
					xl: "500px",
					lg: "500px",
					md: "450px",
					sm: "350px",
					xs: "300px",
				},
				width: {
					xl: "350px",
					lg: "300px",
					md: "200px",
					sm: "250px",
					xs: "250px",
				},
			}}
		>
			<ReactCompareSlider
				itemOne={
					<ReactCompareSliderImage
						src={after}
						alt="before effect image"
						className="rounded-lg"
					/>
				}
				itemTwo={
					<ReactCompareSliderImage
						src={before}
						alt="After effect image"
						className="rounded-lg"
					/>
				}
				style={{ width: "100%", height: "100%" }}
			/>
		</Box>
	);
};

export default ImageComparisonSlider;
