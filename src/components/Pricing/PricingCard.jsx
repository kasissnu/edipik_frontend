import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardActions, CardContent } from "@mui/material";
import CustomButton from "../Common/CustomButton";
import PricingFeatures from "./PricingFeatures";

const PricingCard = ({ card }) => {
	return (
		<>
			<Card className="!shadow-md rounded-3xl">
				<CardContent sx={{ px: "24px" }}>
					<Typography
						variant="h4"
						mt={3}
						fontSize="35px"
						fontWeight={"700"}
						className="font-playfair"
					>
						{card.title}
					</Typography>
					<Typography
						variant="subtitle1"
						fontSize="26px"
						mt={2}
						className="font-playfair"
					>
						<Typography
							variant="subtitle1"
							fontSize="22px"
							component="span"
							className="text-secondary-600"
							fontWeight={"600"}
						>
							{card.pricing}
						</Typography>
						{card.pricingDetails}
					</Typography>
					{/* <Box height="40px">
						<Typography
							variant="caption"
							fontWeight={"300"}
							fontSize="13px"
						>
							Keep your monthly costs stable and save up to 25%
							with our fixed pricing.
						</Typography>
					</Box> */}
					<PricingFeatures listItems={card.features} />
				</CardContent>
				<CardActions className="!p-8">
					<CustomButton
						variant="contained"
						size="small"
						sx={{
							margin: "auto",
							px: 2,
							py: 1,
							display: "flex",
							fontWeight: "500",
							fontSize: "14px",
						}}
					>
						<Typography>{card.buttonlabel}</Typography>
					</CustomButton>
				</CardActions>
				<Box className="pb-10 flex flex-col items-center">
					<Typography
						variant="body2"
						fontWeight={"500"}
						className="pb-1"
					>
						{card.footerNote}
					</Typography>
					{/* <Typography variant="body2" fontWeight={"300"}>
						(+ advanced features fees)
					</Typography> */}
				</Box>
			</Card>
		</>
	);
};

export default PricingCard;
