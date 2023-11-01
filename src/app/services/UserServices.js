import axios from "axios";
import APIURL from "../../utils/getApiUrl";

export const loginUser = async (data) => {
    try {
        let res = await axios.post(APIURL + "/auth/user/login", data);
        // res = res;
        // console.log("inside try block response :", res.data);
        console.log(res.data)
        return res;
    } catch (error) {
      let msg = error.response.data.message;
      console.log("Inside catch block error :", msg);
      return msg;
    }
};

export const socialLoginUser = async (data) => {
    try {
        let res = await axios.post(APIURL + "/auth/user/google-auth-callback", data);
        // res = res;
        // console.log("inside try block response :", res.data);
        console.log(res.data)
        return res;
    } catch (error) {
      let msg = error.response.data.message;
      console.log("Inside catch block error :", msg);
      return msg;
    }
};

export const verifyUser = async (data) => {
    try {
        let res = await axios.post(APIURL + "/auth/user/email/verify", data);
        // console.log("Inside try block response :", res);
        return res;
    } catch (error) {
        let msg = error.response.data;
        console.log("Inside catch block error :", msg);
        return msg;
    }
}

export const registerUser = async (data) => {
    try {
      let res = await axios.post(APIURL + "/auth/user/register", data);
      // res = res;
      // console.log("Inside try block response :", res);
      return res;
    } catch (error) {
      console.log(error)
      let msg = error.response.data;
      // try to check error formate or discuss with mayank about error massage
      console.log("Inside catch block error :", msg);
      return msg;
    }
};

export const forgotPassword = async (data) => {
    try {
      let res = await axios.post(APIURL + "/auth/user/forgot-password", data);
      // console.log("Inside try block response :", res);
      return res;
    } catch (error) {
      let msg = error.response.data;
      console.log("Inside catch block error :", msg);
      return msg;
    }
};

export const resetPassword = async (data) => {
    try {
      let res = await axios.post(APIURL + "/auth/user/forgot-password", data);
      // console.log("Inside try block response :", res);
      return res;
    } catch (error) {
      let msg = error.response.data;
      console.log("Inside catch block error :", msg);
      return msg;
    }
};

export const logOutUser = () => {
    localStorage.clear();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const joinWaitlist = async(data) => {
  try {
    let res = await axios.post(APIURL + "/auth/user/join-wait-list", data);
    console.log("hello",res);
    return res;
  } catch (error) {
    console.log(error)
    let msg = error.response.data;
    // try to check error formate or discuss with mayank about error massage
    console.log("Inside catch block error :", msg);
    return msg;
  }
}

