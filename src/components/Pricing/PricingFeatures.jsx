import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PricingFeatures = (props) => {
  return (
		<>
			<Box mt={2} height="195px">
				{props.listItems.map((list, index) => (
					<List key={index} className="!p-0">
						<ListItem className="!p-0.5 !pl-0 ">
							<ListItemIcon
								sx={{ minWidth: "30px" }}
								className="!text-secondary-600"
							>
								<CheckCircleIcon />
							</ListItemIcon>
							<Typography component="div">
								<ListItemText
									primaryTypographyProps={{
										className: "font-sans text-xl",
									}}
									primary={list}
								/>
							</Typography>
						</ListItem>
					</List>
				))}
			</Box>
		</>
  );
};
export default PricingFeatures;
