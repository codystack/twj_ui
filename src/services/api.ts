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
    if (error.response?.status === 401 && !originalRequest._retry) {
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
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;
        console.log("Refresh Response:", refreshResponse.data);

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
    localStorage.setItem("lastVisitedRoute", location.pathname); // Store last route
        window.location.href = "/"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

 export default api;
// // Function to store last visited route
// const storeLastVisitedRoute = (path: string) => {
//   localStorage.setItem("lastVisitedRoute", path);
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token is expired (401)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const getRefreshToken = () => {
//           const storedToken = localStorage.getItem("refreshToken");
//           return storedToken ? decryptData(storedToken) : null;
//         };

//         const refreshToken = getRefreshToken();
//         if (!refreshToken) throw new Error("No refresh token available");

//         // Request new access token
//         const payload = {
//           userName: localStorage.getItem("userName"),
//           refreshToken: refreshToken,
//         };

//         const refreshResponse = await axios.post(
//           "/Authentication/refressAccessToken",
//           payload
//         );

//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//           refreshResponse.data;

//         // ✅ Store new tokens
//         localStorage.setItem("accessToken", encryptData(newAccessToken));
//         localStorage.setItem("refreshToken", encryptData(newRefreshToken));

//         // Retry request with new token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         // ❌ Logout & store last visited route
//         storeLastVisitedRoute(window.location.pathname);

//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("name");
//         localStorage.removeItem("email");
//         localStorage.removeItem("userName");
//         localStorage.removeItem("isAuthenticated");

//         // window.location.href = "/"; // Redirect to login
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );


// export default api;