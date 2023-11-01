export const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem("refreshToken");

    if (!token && !refresh) {
      return false;
    }

    return true;
};