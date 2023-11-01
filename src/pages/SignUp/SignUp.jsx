import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, FormControl, Divider, OutlinedInput } from "@mui/material";
import { InputAdornment, InputLabel } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import Container from "@mui/material/Container";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../../app/services/UserServices";
import { useForm } from "react-hook-form";
import APP_CONSTANTS from "../../utils/constants/app.constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleSignInButton from "../../components/Common/GoogleSignInButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { checkAuth } from "../../utils/checkAuth";
import { useNotification } from "../../utils/Hooks/useNotification";
import CustomButton from "../../components/Common/CustomButton";
import signupBg from "../../assets/images/auth-bg.png";

const SignUp = () => {
	const { showNotification } = useNotification();
	const [isLoader, setLoader] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	if (checkAuth()) {
		return <Navigate to="/" />;
	}

	const onSubmit = (data) => {
		setLoader(true);
		const register = {
			first_name: data["firstName"],
			last_name: data["lastName"],
			email: data["email"],
			password: data["password"],
		};

		registerUser(register).then((res) => {
			if (res.status === 201) {
				console.log("Success response : ", res.data);
				setLoader(false);
				showNotification(APP_CONSTANTS.AUTH_SUCCESS.SIGNUP, "success");
				reset((formValues) => ({
					...formValues,
					firstName: "",
					lastName: "",
					email: "",
					password: "",
				}));
			} else {
				const errorMsg = res.non_field_errors
					? res.non_field_errors[0]
					: res.email
					? res.email[0]
					: res.first_name
					? res.first_name[0]
					: res.last_name
					? res.last_name[0]
					: "";
				setLoader(false);
				showNotification(errorMsg, "error");
			}
		});
	};

	return (
		<Box className="relative overflow-hidden">
			<Box className="absolute bottom-[-2rem] sm:right-[-3%] -rotate-[30deg]">
				<img
					src={signupBg}
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
						mb={2}
						fontWeight="600"
						className="font-playfair text-[2.5rem] lg:text-[4rem]"
					>
						Sign Up to Edipik
					</Typography>
					<Typography className="text-2xl">
						Get your first personalised AI assistant
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
						md
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit(onSubmit)}
							sx={{ mt: 1 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<InputLabel
										htmlFor="firstName"
										className="mb-2"
									>
										<Typography>First Name</Typography>
									</InputLabel>
									<OutlinedInput
										size="small"
										required
										fullWidth
										id="firstName"
										name="firstName"
										autoComplete="first-name"
										{...register("firstName", {
											required: true,
										})}
									/>
									{errors.firstName &&
										errors.firstName.type ===
											"required" && (
											<Typography
												className="m-0 text-[#ff0000]"
												m={0}
											>
												First Name is required
											</Typography>
										)}
								</Grid>
								<Grid item xs={12} sm={6}>
									<InputLabel
										htmlFor="lastName"
										className="mb-2"
									>
										<Typography>Last Name</Typography>
									</InputLabel>
									<OutlinedInput
										size="small"
										required
										fullWidth
										id="lastName"
										name="lastName"
										autoComplete="lastName"
										{...register("lastName", {
											required: true,
										})}
									/>
									{errors.lastName &&
										errors.lastName.type === "required" && (
											<Typography
												className="m-0 text-[#ff0000]"
												m={0}
											>
												Last Name is required
											</Typography>
										)}
								</Grid>
							</Grid>
							<FormControl
								fullWidth
								required
								sx={{ mt: 2 }}
								variant="outlined"
							>
								<InputLabel htmlFor="email" className="mb-2">
									<Typography>Email Address</Typography>
								</InputLabel>
								<OutlinedInput
									size="small"
									id="email"
									name="email"
									variant="outlined"
									required
									fullWidth
									autoComplete="email"
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
							</FormControl>

							<FormControl
								fullWidth
								required
								sx={{ mt: 2 }}
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
							<Box className="mt-2">
								<Typography component="span">
									Already have an account?&nbsp;
								</Typography>
								<Link
									to={"/user/signin"}
									underline="hover"
									className="text-primary-900 font-medium"
								>
									Sign in
								</Link>
							</Box>
							{errors.password &&
								errors.password.type === "required" && (
									<Typography
										className="m-0 text-[#ff0000]"
										m={0}
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
							<CustomButton
								loading={isLoader}
								loadingPosition="end"
								type="submit"
								btntype="loading"
								variant="contained"
								sx={{
									margin: "auto",
									textTransform: "none",
									borderRadius: "25px",
								}}
								className={`px-4 py-2 flex text-white mt-4 ${
									isLoader ? "pr-9" : ""
								}`}
							>
								Sign Up
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
						xs
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

export default SignUp