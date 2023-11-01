import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../components/Layout/BaseLayout";
import ErrorPage from "../components/Error/ErrorPage";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import EmailVerification from "../pages/EmailVerification/EmailVerification";
import AuthLayout from "../components/Layout/AuthLayout";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import Pricing from "../pages/Pricing/Pricing";
import Upload from "../pages/Upload/Upload";

const router = createBrowserRouter([
{
    path: "/",
    element: <BaseLayout />,
    errorElement: <ErrorPage />,
    children: [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/user/signin",
        element: <SignIn />,
    },
    {
        path: "/user/signup",
        element: <SignUp />,
    },
    {
        path: "/user/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "/user/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/user/email-verification",
        element: <EmailVerification />,
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/upload",
                element: <Upload />,
            },
        ],
    },
    {
        path: "/pricing",
        element: <Pricing />,
    },
    ],
},
]);

export default router;