import axios from "axios";

// 取得 token
export const getToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("crystalToken="))
    ?.split("=")[1];
};

// 設定 axios header
export const setAuthToken = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

// 驗證登入
export const checkAdmin = async (BASE_URL) => {
  try {
    await axios.post(`${BASE_URL}/api/user/check`);
    return true;
  } catch (error) {
    return false;
  }
};
