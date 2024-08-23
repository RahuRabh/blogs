import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const register = async ({ name, email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/register`;
    const response = await axios.post(reqUrl, { name, email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { status: "error", message: "Network error" };
    }
  }
};

export const login = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return { status: "error", message: "Network error" };
    }
  }
};
