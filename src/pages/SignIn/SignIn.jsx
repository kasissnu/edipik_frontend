import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { InputAdornment, InputLabel } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Divider, FormControl, OutlinedInput } from "@mui/material";
import GoogleSignInButton from "../../components/Common/GoogleSignInButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { loginUser } from "../../app/services/UserServices";
import {
	loginFail,
	loginPending,
	loginSuccess,
} from "../../app/features/AuthSlice";
import { useForm } from "react-hook-form";
import { useNotification } from "../../utils/Hooks/useNotification";
import CustomButton from "../../components/Common/CustomButton";
import loginBg from "../../assets/images/auth-bg.png";

const SignIn = () => {
	const { showNotification } = useNotification();
	// const [error, setError] = useState(false);
	const [isSubmit, setSubmit] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const onSubmit = async (data) => {
		setSubmit(true);
		dispatch(loginPending());
		loginUser(data).then((res) => {
			if (res.status === 200) {
				dispatch(loginSuccess(res.data));
				setSubmit(false);
				showNotification(res.data.message, "success");
				navigate("/");
			} else {
				setSubmit(false);
				dispatch(loginFail(res));
				showNotification(res, "error");
			}
		});
	};

	return (
		<Box className="relative overflow-hidden">
			<Box className="absolute bottom-[-2rem] sm:right-[-3%] -rotate-[30deg]">
				<img
					src={loginBg}
					alt="login bg"
					className="w-[20rem] sm:w-[30rem] h-[20rem] sm:h-[30rem] object-cover opacity-10 md:opacity-60"
				/>
			</Box>
			<Container
				component="main"
				maxWidth="md"
				className="mt-5 sm:mt-10 px-10 py-20 relative overflow-hidden"
			>
				<CssBaseline />
				<Box
					sx={{
						textAlign: "center",
					}}
					className="mb-10 z-10 relative"
				>
					<Typography
						variant="h3"
						mb={3}
						fontWeight="600"
						className="font-playfair text-[2.5rem] lg:text-[4rem]"
					>
						Login to Edipik
					</Typography>
					<Typography className="text-2xl">
						Welcome back! Start creating miracles
					</Typography>
				</Box>

				<Grid
					container
					spacing={2}
					direction={{ xs: "column-reverse", md: "row" }}
					className="z-10 relative"
				>
					<Grid
						item
						xs={12}
						md={5}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box
							component="form"
							noValidate
							// className="mt-3"
							onSubmit={handleSubmit(onSubmit)}
						>
							<FormControl
								fullWidth
								required
								sx={{ mt: 1 }}
								variant="outlined"
							>
								<InputLabel
									htmlFor="outlined-adornment-password"
									className="mb-2"
								>
									<Typography>Email Address</Typography>
								</InputLabel>
								<OutlinedInput
									size="small"
									required
									fullWidth
									{...register("email", {
										required: true,
										pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
									})}
								/>
							</FormControl>
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
							<FormControl
								fullWidth
								required
								sx={{ mt: 3 }}
								variant="outlined"
							>
								<InputLabel
									htmlFor="outlined-adornment-password"
									className="mb-2"
								>
									<Typography>Password</Typography>
								</InputLabel>
								<OutlinedInput
									size="small"
									name="password"
									id="outlined-adornment-password"
									type={showPassword ? "text" : "password"}
									autoComplete="password"
									{...register("password", {
										required: true,
										minLength: 8,
									})}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												onMouseDown={
													handleMouseDownPassword
												}
												edge="end"
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
							{errors.password &&
								errors.password.type === "required" && (
									<Typography
										className="m-0 text-[#ff0000]"
										width="100%"
									>
										Password is required
									</Typography>
								)}
							{errors.password &&
								errors.password.type === "minLength" && (
									<Typography className="m-0 text-[#ff0000]">
										Password should be at-least 8 characters
									</Typography>
								)}
							<Link
								to={"/user/forgot-password"}
								underline="hover"
								className="text-primary-900 underline"
							>
								<Typography textAlign="right" mt={1}>
									Forgot password?
								</Typography>
							</Link>
							<Typography component="span">
								New around here? Create an account.&nbsp;
							</Typography>
							<Link
								to={"/user/signup"}
								underline="hover"
								className="text-primary-900 font-medium"
							>
								Join Edipik
							</Link>
							<CustomButton
								loading={isSubmit}
								loadingPosition="end"
								type="submit"
								btntype="loading"
								variant="contained"
								sx={{
									margin: "auto",
									display: "flex",
									color: "white",
									textTransform: "none",
									borderRadius: "25px",
								}}
								className={`px-4 py-2 mt-5 ${
									isSubmit ? "pr-9" : ""
								}`}
							>
								Sign In
							</CustomButton>
						</Box>
					</Grid>
					<Divider
						orientation="vertical"
						flexItem
						className="px-8 md:block hidden"
					></Divider>
					<Divider
						flexItem
						className="px-8 md:hidden block"
					></Divider>
					<Grid
						item
						xs={12}
						md={5}
						className="p-3 md:pt-0 flex justify-center items-center"
					>
						<GoogleOAuthProvider
							clientId={
								process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID
							}
						>
							<GoogleSignInButton />
						</GoogleOAuthProvider>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default SignIn;
