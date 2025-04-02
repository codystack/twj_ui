import axios from "axios";
// import { useAuthorizationStore } from "../store/authorizationStore";
import { decryptData, encryptData } from "./utils/crypto-utils";
// import { useLocation } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Access VITE env variable
// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// const location = useLocation(); // Get the current route

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
    const status = error.response?.status;
    // console.log("401 error", status);
    if ((status === 401 || status === 400) && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        const getRefreshToken = () => {
          const storedToken = localStorage.getItem("refreshToken");
          return storedToken ? decryptData(storedToken) : null;
        };

        const refreshToken = getRefreshToken();
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
        // console.log(
        //   "new token:",
        //   newAccessToken,
        //   "new refresh:",
        //   newRefreshToken
        // );
        // console.log("Refresh Response:", refreshResponse.data.data.token);

        // ✅ Store the new tokens in local storage
        localStorage.setItem("accessToken", encryptData(newAccessToken));
        localStorage.setItem("refreshToken", encryptData(newRefreshToken));

        // Retry the original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Logout user if refresh fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        localStorage.removeItem("isAuthenticated");
        localStorage.setItem("lastVisitedRoute", location.pathname);
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
