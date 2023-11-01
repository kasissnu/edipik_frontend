import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const CustomButton = (props) => {
	const {
		children,
		color,
		btntype,
		loadingPosition,
		disabled,
		className,
		sx,
		...rest
	} = props;

	return btntype === "loading" ? (
		<LoadingButton
			disabled={disabled}
			loadingPosition={loadingPosition}
			className={`!text-white ${
				color ? color : "!bg-secondary-600 hover:!bg-secondary-700"
			} !rounded-md ${className || ""}`}
			sx={{
				display: "flex",
				textTransform: "none",
				...sx,
			}}
			{...rest}
		>
			{children}
		</LoadingButton>
	) : btntype === "link" ? (
		<Button
			className={`border-b-2 border-solid border-secondary-500 ${
				color ? color : "text-secondary-600"
			} ${className || ""}`}
			sx={{
				display: "flex",
				textTransform: "none",
				...sx,
			}}
			{...rest}
		>
			{children}
		</Button>
	) : (
		<Button
			disabled={disabled}
			className={`text-white ${
				color ? color : "bg-secondary-600 hover:bg-secondary-700"
			} rounded-full ${className || ""}`}
			sx={{
				display: "flex",
				textTransform: "none",
				...sx,
			}}
			{...rest}
		>
			{children}
		</Button>
	);
};

export default CustomButton;
