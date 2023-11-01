import React from "react";
import demoVideo from "../../../assets/video/demo";
import demo1 from "../../../assets/images/demo-01.png";
import demo2 from "../../../assets/images/demo-02.jpg";
import demo3 from "../../../assets/images/demo-03.png";
import demo4 from "../../../assets/images/demo-04.png";
import dummy from "../../../assets/images/dummy.jpg";
import ImageContent from "./ImageContent";
import { Box, Container } from "@mui/material";

const Guidance = () => {
	const guidancData = [
		{
			index: "01",
			title: "Personalized Style",
			description:
				"Use AI to analyze your previous photo edits and apply them to new, unedited photos. This means that you can create photo edits that are tailored to your personal style, without sacrificing quality or efficiency.",
			mediaType: "video",
			media: demoVideo,
		},
		{
			index: "02",
			title: "Time-Saving",
			description:
				"Specifically designed to help you save time and reduce your editing workload. With our AI-powered solution, you can edit photos in just seconds. You can edit an entire wedding in just 10 minutes!",
			mediaType: "image",
			media: demo1,
		},
		{
			index: "03",
			title: "User-Friendly",
			description:
				"A user-friendly interface that makes photo editing easy and intuitive. It's designed to be easy to use for all levels of experience and there is no need to download any app or specific plugins",
			mediaType: "image",
			media: dummy,
		},
		{
			index: "04",
			title: "AI Profiles",
			description:
				"Preloaded with AI profiles that have been created by industry-leading photographers. These profiles are designed to help you create stunning photo edits with ease, and deliver high-quality results every time.",
			mediaType: "image",
			media: demo3,
		},
		{
			index: "05",
			title: "Competitive Pricing",
			description:
				"We offer the cheapest pricing in the market, starting from ₹4 per photo edited. Plus, we offer a free trial of 1000 images to get started making it accessible to photographers of all levels. We believe that high-quality photo editing should be accessible to everyone.",
			mediaType: "image",
			media: demo4,
		},
	];

	return (
		<>
			<Box id="product-block" className="pb-10 font-montserrat bg-gray">
				{guidancData.map((item, index) => {
					return (
						<ImageContent key={index} index={index} item={item} />
					);
				})}
			</Box>
		</>
	);
};

export default Guidance;
