import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "@mui/material";
import { resetPassword } from "../../app/services/UserServices";
import { useForm } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { checkAuth } from "../../utils/checkAuth";
import { useNotification } from "../../utils/Hooks/useNotification";
import { InputLabel, OutlinedInput } from "@mui/material";
import resetBg from "../../assets/images/auth-bg.png";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const ResetPassword = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

	const handleMouseDownConfirmPassword = (event) => {
		event.preventDefault();
	};
	const { showNotification } = useNotification();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [isSubmit, setSubmit] = useState(false);

	if (checkAuth()) {
		return <Navigate to="/" />;
	} else if (
		searchParams.get("value") == null &&
		searchParams.get("token") == null
	) {
		return <Navigate to="/" />;
	}

	const onSubmit = (data) => {
		setSubmit(true);
		const formData = {
			password: data["password"],
			email: searchParams.get("value"),
			session_token: searchParams.get("token"),
			security_code: searchParams.get("token"),
		};

		resetPassword(formData).then((res) => {
			if (res.status === 202) {
				navigate("/user/signin?reset-password=success");
				setSubmit(false);
			} else {
				setSubmit(false);
				if (res.non_field_errors)
					showNotification(res.non_field_errors, "error");
				else showNotification(res.password, "error");
			}
		});
	};

	return (
		<>
			<Box className="relative overflow-hidden py-32">
				<Box className="absolute bottom-[-2rem] sm:right-[-3%] -rotate-[30deg]">
					<img
						src={resetBg}
						alt="login bg"
						className="w-[30rem] h-[30rem] object-cover opacity-30 md:opacity-60"
					/>
				</Box>
				<Container component="main" maxWidth="sm">
					<CssBaseline />
					<Grid item xs={12} sm={8} md={8}>
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
								component="h1"
								variant="h3"
								mb={2}
								fontWeight="600"
								className="font-playfair text-[2.5rem] lg:text-[3.5rem]"
							>
								Reset Password
							</Typography>
							<Box
								component="form"
								noValidate
								fullWidth
								onSubmit={handleSubmit(onSubmit)}
								sx={{ mt: 1 }}
							>
								<InputLabel htmlFor="password" className="mb-2">
									<Typography>Password</Typography>
								</InputLabel>
								<OutlinedInput
									id="password"
									margin="normal"
									required
									size="small"
									type={showPassword ? 'text' : 'password'}
									endAdornment={
									<InputAdornment position="end">
										<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownConfirmPassword}
										edge="end"
										>
										{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
									}
									{...register("password", {
										required: true,
										minLength: 8,
									})}
								/>
								{errors.password &&
									errors.password.type === "required" && (
										<Typography
											className="m-0 text-[#ff0000]"
											width="100%"
										>
											Please enter your password
										</Typography>
									)}
								{errors.password &&
									errors.password.type === "minLength" && (
										<Typography className="m-0 text-[#ff0000]">
											Your password should be at-least 8
											characters
										</Typography>
									)}
								<InputLabel
									htmlFor="confirm_password"
									className="mb-2 mt-2"
								>
									<Typography>Confirm Password</Typography>
								</InputLabel>
								<OutlinedInput
									id="confirm_password"
									margin="normal"
									required
									size="small"
									type={showConfirmPassword ? 'text' : 'password'}
									endAdornment={
									<InputAdornment position="end">
										<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowConfirmPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										>
										{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
									}
									{...register("confirm_password", {
										required: true,
										minLength: 8,
									})}
								/>
								{errors.confirm_password &&
									errors.confirm_password.type ===
										"required" && (
										<Typography
											className="m-0 text-[#ff0000]"
											width="100%"
										>
											Please enter your confirm password
										</Typography>
									)}
								{errors.confirm_password &&
									errors.confirm_password.type ===
										"minLength" && (
										<Typography className="m-0 text-[#ff0000]">
											Password should be at-least 8
											characters
										</Typography>
									)}
								<LoadingButton
									loading={isSubmit}
									loadingPosition="end"
									type="submit"
									variant="contained"
									sx={{
										margin: "auto",
										pl: 4,
										mt: 2,
										mb: 2,
										display: "flex",
									}}
									endIcon={
										<SendIcon
											sx={{ visibility: "hidden" }}
										/>
									}
								>
									Submit
								</LoadingButton>
							</Box>
						</Box>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default ResetPassword;
