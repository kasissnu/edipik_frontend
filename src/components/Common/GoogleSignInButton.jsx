import React from 'react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import APIURL from '../../utils/getApiUrl';
import { socialLoginUser } from '../../app/services/UserServices';
import { useDispatch } from 'react-redux';
import { loginFail, loginSuccess } from '../../app/features/AuthSlice';
import { useNavigate } from 'react-router';
import { useNotification } from "../../utils/Hooks/useNotification";
import APP_CONSTANTS from "../../utils/constants/app.constants";

const GoogleSignInButton = () => {
	const { showNotification } = useNotification();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const buttonStyle = {
		backgroundColor: "#f1c40f",
		color: "#fff",
		borderRadius: "5px",
		fontSize: "16px",
		padding: "10px 20px",
		boxShadow: "none",
		border: "none",
	};

	useGoogleLogin({
		onSuccess: (credentialResponse) => {
			console.log(credentialResponse);
			const data = { key: credentialResponse.credential };

			axios
				.post(APIURL + "/auth/user/google-auth-callback", data)
				.then((response) => {
					socialLoginUser(data).then((res) => {
						if (res.status === 200) {
							console.log("res", res);
							dispatch(loginSuccess(res.data));
							navigate("/");
							showNotification(
								APP_CONSTANTS.AUTH_SUCCESS.SIGNUP,
								"success",
							);
						} else {
							dispatch(loginFail(res));
							showNotification(res, "danger");
						}
					});
				})
				.catch((error) => {
					console.log(error);
				});
		},
		onError: () => {
			console.log("Login Failed");
		},

		flow: "auth-code",
	});

	return (
		<>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);

					const data = { key: credentialResponse.credential };

					axios
						.post(APIURL + "/auth/user/google-auth-callback", data)
						.then((response) => {
							socialLoginUser(data).then((res) => {
								if (res.status === 200) {
									dispatch(loginSuccess(res.data));
									navigate("/");
									showNotification(
										res.data.message,
										"success",
									);
								} else {
									dispatch(loginFail(res));
									showNotification(res, "danger");
								}
							});
						})
						.catch((error) => {
							console.log(error);
						});
				}}
				onError={() => {
					console.log("Login Failed");
				}}
				type="standard"
				text="continue_with"
				size="large"
				width="270px"
				shape="circle"
				logo_alignment="left"
				// hosted_domain="none"
				style={buttonStyle}
				className="google-login-button"
			/>

			{/* <Button onClick={() => login()}>
      Sign in with Google 🚀{' '}
    </Button>; */}
		</>
	);
};

export default GoogleSignInButton

