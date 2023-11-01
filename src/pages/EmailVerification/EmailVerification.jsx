import * as React from 'react';
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../app/services/UserServices';
import { emailVerifySuccess, emailVerifyFail } from '../../app/features/AuthSlice';

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleVerification = (e) => {
        const data = {
            email: searchParams.get("email"),
            session_token: searchParams.get("token")
        };

        verifyUser(data).then((res) => {
            if (res.status === 200) {
                dispatch(emailVerifySuccess());
                navigate("/user/signin?email-verify=success");
            } else {
                dispatch(emailVerifyFail());
                navigate("/user/signin?email-verify=fail");
            }
        });
    };

    return (
        <>
            {handleVerification()}
        </>
    );
}

export default EmailVerification;

