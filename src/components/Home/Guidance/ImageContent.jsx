import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { fadeIn, slideIn, staggerContainer } from "../../../utils/motion";

const ImageContent = (props) => {
	const checkOddNumber = (number) => {
		if (number % 2 !== 0) {
			return true;
		}
		return false;
	};

	return (
		<motion.div
			variants={staggerContainer()}
			initial="hidden"
			whileInView={"show"}
			viewport={{ once: true, amount: 0.25 }}
			className={`lg:grid grid-cols-2 gap-4 overflow-hidden ${
				props.index !== 0 ? "mt-10" : ""
			}`}
			key={`product-${props.item.index}`}
		>
			{/* ${props.index == 0 ? "pt-10" : "pt-20"} */}
			<motion.div
				className={`w-full h-full flex flex-col justify-center items-center bg-columbiaBlue my-10 pt-8 lg:pt-0 ${
					checkOddNumber(props.index) ? "order-last" : ""
				}`}
			>
				<Box className="w-full mx-auto px-5 py-5 sm:py-0 overflow-auto relative">
					<Box
						className={`px-5 pb-10 relative ${
							!checkOddNumber(props.index) ? "text-right" : ""
						}`}
					>
						<motion.div
							variants={
								checkOddNumber(props.index)
									? slideIn(
											"down",
											"spring",
											0.3 * props.index,
											0.6,
									  )
									: slideIn(
											"down",
											"spring",
											0.3 * props.index,
											0.6,
									  )
							}
							className={`absolute text-[8rem] lg:text-[9.5rem] leading-8 font-semibold text-secondary-500 opacity-50 ${
								!checkOddNumber(props.index) ? "right-0" : ""
							}`}
						>
							{props.item.index}
						</motion.div>
						<Typography
							variant="h3"
							className="leading-10 md:leading-[3rem] font-bold text-[2rem] lg:text-[3rem] xl:text-[3.5rem] text-black pt-6 z-10 relative my-10"
						>
							{props.item.title}
						</Typography>

						<Typography
							variant="body1"
							className="text-xl lg:text-2xl leading-8 overflow-hidden"
						>
							{props.item.description}
						</Typography>
					</Box>
				</Box>
			</motion.div>
			<motion.div
				variants={
					checkOddNumber(props.index)
						? fadeIn("right", "tween", 0.3 * props.index, 0.3)
						: fadeIn("left", "tween", 0.3 * props.index, 0.3)
				}
				className="w-full h-full px-10 pt-10"
			>
				<Box className="flex justify-center items-center w-full h-full lg:h-[630px]">
					{props.item.mediaType === "video" ? (
						<video
							className="w-full rounded-3xl shadow-xl"
							height={"auto"}
							loop
							autoPlay
							muted
						>
							<source src={props.item.media} type="video/mp4" />
						</video>
					) : (
						<img
							src={props.item.media}
							alt={props.item.title}
							className="w-full h-full object-cover rounded-3xl shadow-xl object-top"
						/>
					)}
				</Box>
			</motion.div>
		</motion.div>
	);
};

export default ImageContent;
