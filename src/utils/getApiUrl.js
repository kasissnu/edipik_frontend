const { REACT_APP_DEV_URL, REACT_APP_PROD_URL,REACT_APP_ENV, REACT_APP_WS_DEV_URL, REACT_APP_WS_PROD_URL } = process.env;

export const getApiUrl = ($type = null) => {
  const env = REACT_APP_ENV;
  if (env === "dev") {
    if ($type !== null && $type === "WS") {
      return REACT_APP_WS_DEV_URL;
    }
    return REACT_APP_DEV_URL;
  } else if (env === "production") {
    if ($type !== null && $type === "WS") {
      return REACT_APP_WS_PROD_URL;
    }
    return REACT_APP_PROD_URL;
  } else {
    return "";
  }
};

const APIURL = getApiUrl();

export default APIURL;