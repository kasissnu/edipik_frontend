import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { forgotPassword } from '../../app/services/UserServices';
import { Grid } from '@mui/material';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNotification } from "../../utils/Hooks/useNotification";
import { InputLabel } from "@material-ui/core";
import { OutlinedInput } from "@mui/material";
import CustomButton from "../../components/Common/CustomButton";
import "../../utils/colors.js";
import forgotBg from "../../assets/images/auth-bg.png";

const ForgotPassword = () => {
	const { showNotification } = useNotification();
	const [isSubmit, setSubmit] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		setSubmit(true);
		const formData = {
			email: data["email"],
		};

		forgotPassword(formData).then((res) => {
			if (
				res.status === 202 ||
				res.status === 201 ||
				res.status === 200
			) {
				console.log(res.data.message);
				setSubmit(false);
				showNotification(res.data.message, "success");
			} else {
				const errMsg = res.non_field_errors
					? res.non_field_errors[0]
					: "";
				console.log("Error response : ", errMsg);
				setSubmit(false);
				showNotification(errMsg, "error");
			}
		});
	};

	return (
		<>
			<Box className="relative overflow-hidden py-32">
				<Box className="absolute bottom-[-2rem] sm:right-[-3%] -rotate-[30deg]">
					<img
						src={forgotBg}
						alt="login bg"
						className="w-[30rem] h-[30rem] object-cover opacity-30 md:opacity-60"
					/>
				</Box>
				<Container component="main" maxWidth="sm">
					<CssBaseline />
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography
							variant="h4"
							mb={4}
							fontWeight="700"
							className="font-playfair text-[2.5rem] lg:text-[2.8rem]"
						>
							Forget your password?
						</Typography>
						<Typography
							textAlign={"center"}
							variant="subtitle1"
							className="text-lg"
						>
							Just give us the email address you used to create
							your account and we will send you an email to make a
							new password.
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit(onSubmit)}
							sx={{ mt: 4 }}
							maxWidth="md"
						>
							<InputLabel htmlFor="email" className="mb-2">
								<Typography>Email Address</Typography>
							</InputLabel>
							<OutlinedInput
								size="small"
								margin="normal"
								fullWidth
								required
								id="email"
								{...register("email", {
									required: true,
									pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
								})}
							/>
							{errors.email &&
								errors.email.type === "required" && (
									<Typography
										className="m-0 text-[#ff0000]"
										m={0}
										width="100%"
									>
										Email is required
									</Typography>
								)}
							{errors.email &&
								errors.email.type === "pattern" && (
									<Typography className="m-0 text-[#ff0000]">
										Email is not valid
									</Typography>
								)}
							<Box
								sx={{
									display: "flex",
									margin: "auto",
									justifyContent: "center",
									mt: "20px",
								}}
								width="320px"
							>
								<Grid container spacing={0}>
									<Grid item xs={6}>
										<CustomButton
											loading={isSubmit}
											loadingPosition="end"
											type="submit"
											btntype="loading"
											variant="contained"
											sx={{
												margin: "auto",
												mt: 2,
												mb: 2,
												display: "flex",
												color: "white",
												textTransform: "none",
												borderRadius: "25px",
											}}
											className={`text-lg ${
												isSubmit ? "pr-9" : ""
											}`}
										>
											Send Email
										</CustomButton>
									</Grid>
									<Grid
										item
										xs={6}
										className="flex justify-center"
									>
										<Link
											sx={{
												mt: 2,
												mb: 2,
												fontWeight: "900",
												textTransform: "none",
											}}
											component={Link}
											to={"/user/signin"}
											className="flex items-center justify-center"
										>
											<Typography className="underline text-primary-900 font-medium text-lg">
												Back to Sign in
											</Typography>
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default ForgotPassword