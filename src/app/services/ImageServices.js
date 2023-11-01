import axios from "axios";
import APIURL from "../../utils/getApiUrl";

export const enhanceImage = async (data) => {
    try {
        let res = await axios.post(APIURL + "/api/process-image", data);
        // res = res;
        // console.log("inside try block response :", res.data);
        console.log(res.data)
        return res;
    } catch (error) {
      let msg = error.response.data.message;
      console.log("Inside catch block error :", msg);
      return msg;
    }
}