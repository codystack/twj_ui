import axios from "axios";
import { useAuthorizationStore } from "../store/authorizationStore";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor: Attach Access Token to Requests
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthorizationStore.getState();
    // console.log("accessToken", accessToken);
    // console.log("refreshToken", refreshToken); // remove this line after the check is done

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Expired Tokens
api.interceptors.response.use(
  (response) => response, // Return response if request succeeds
  async (error) => {
    const originalRequest = error.config;

    // If access token is expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        // Get refresh token from Zustand store
        const { refreshToken } = useAuthorizationStore.getState();
        if (!refreshToken) throw new Error("No refresh token available");

        // Request new access token using payload
        const payload = {
          userName: localStorage.getItem("userName"),
          refreshToken: refreshToken,
        };

        const refreshResponse = await axios.post(
          "/Authentication/refressAccessToken",
          payload
        );

        // Extract new tokens from response
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        // ✅ Update Zustand store with new tokens
        useAuthorizationStore
          .getState()
          .setTokens(newAccessToken, newRefreshToken);
          // console.log("newAccessToken", newAccessToken);
          // console.log("newRefreshToken", newRefreshToken);

        // Retry the original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // console.error("Refresh token expired. Logging out...");
        useAuthorizationStore.getState().clearTokens(); // Clear tokens from store
        //window.location.href="/"; // Redirect to login

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
