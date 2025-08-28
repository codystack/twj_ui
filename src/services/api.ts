import axios from "axios";
import { decryptData, encryptData } from "./utils/crypto-utils";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor: Attach Access Token to Requests
api.interceptors.request.use(
  (config) => {
    const getAccessToken = () => {
      const storedToken = localStorage.getItem("accessToken");
      return storedToken ? decryptData(storedToken) : null;
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // console.log(accessToken);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Expired Tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token is expired (401)
    // console.log("Error response:", error.response);
    const status = error.response?.status;

    // console.log("401 error", status);
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        const getRefreshToken = () => {
          const storedToken = localStorage.getItem("refreshToken");
          return storedToken ? decryptData(storedToken) : null;
        };

        const refreshToken = getRefreshToken();
        // console.log("Refresh token:", refreshToken);
        if (!refreshToken) throw new Error("No refresh token available");

        // Request new access token using payload
        const payload = {
          userName: localStorage.getItem("userName"),
          refreshToken: refreshToken,
        };

        const refreshResponse = await axios.post(
          `${BASE_URL}/Authentication/refressAccessToken`,
          payload
        );

        // Extract new tokens from response
        // const newAccessToken = refreshResponse
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data.data.token;

        localStorage.setItem("accessToken", encryptData(newAccessToken));
        localStorage.setItem("refreshToken", encryptData(newRefreshToken));

        // if (newRefreshToken) {
        //   console.log("New refresh token set");
        // }

        // Retry the original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Logout user if refresh fails
        // console.log("Refresh token failed");
        localStorage.clear();
        localStorage.setItem("lastVisitedRoute", location.pathname);
        // window.location.href = "/";
        const navigate = useNavigate();
        navigate("/");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
