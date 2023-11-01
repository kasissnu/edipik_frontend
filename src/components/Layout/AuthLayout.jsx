import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/user/signin" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
