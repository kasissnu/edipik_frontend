import { createSlice } from '@reduxjs/toolkit'
import { checkAuth } from '../../utils/checkAuth';

const localStorageUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
const localStorageAccess = localStorage.getItem("accessToken");
const localStorageRefresh = localStorage.getItem("refreshToken");

const initialState = {
    isLoading: false,
    emailVerify: false,
    error: "",
    isAuthenticated: checkAuth() ? true : false,
    access: localStorageAccess,
    refresh: localStorageRefresh,
    user: localStorageUser,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginPending: (state) => {
        state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            localStorage.setItem("accessToken", action.payload.access);
            state.access = action.payload.access;
            localStorage.setItem("refreshToken", action.payload.refresh);
            state.refresh = action.payload.refresh;
            state.error = '';
            state.emailVerify = action.payload.email_verify;
            state.user = action.payload.user ? action.payload.user[0].fields : "";
            localStorage.setItem("user", action.payload.user ? JSON.stringify(action.payload.user[0].fields) : "");
        },
        loginFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        emailVerifySuccess: (state) => {
            state.emailVerify = true;
        },
        emailVerifyFail: (state) => {
            state.emailVerify = false;
        },
        logOutUserSuccess: (state) => {
            state.isLoading = false;
            state.emailVerify = false;
            state.error = "";
            state.isAuthenticated = false;
            state.access = "";
            state.refresh = "";
        }
    }
});

export const { loginPending, loginSuccess, loginFail, logOutUserSuccess, emailVerifySuccess, emailVerifyFail } = AuthSlice.actions

export default AuthSlice.reducer