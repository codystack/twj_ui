import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
  user: any;
  message: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isCheckingAuth: boolean;
  isVerifyingOtp: boolean;
  verificationError: string | null;
  verificationSuccess: boolean;
  signUpError: null;
  loginError: null;
  loginSuccess: boolean;
  isLoadingLogin: boolean;

  setIsAuthenticated: (status: boolean) => void;
  checkAuth: () => void;
  signUp: (
    formData: Record<string, any>,
    navigate: (path: string) => void
  ) => Promise<void>;
  emailVerification: (token: string[]) => Promise<void>;
  login: (
    formData: Record<string, any>,
    navigate: (path: string) => void
  ) => Promise<void>;
  logout: (navigate: (path: string) => void) => void;

  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  message: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isVerifyingOtp: false,
  verificationError: null,
  verificationSuccess: false,
  signUpError: null,
  loginError: null, // Renamed for clarity
  loginSuccess: false, // To track successful login
  isLoadingLogin: false,

  setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),

  // Signup Function
  signUp: async (formData, navigate) => {
    set({ isLoading: true, signUpError: null });

    try {
      const response = await axios.post(`${API_URL}/register-user`, {
        ...formData,
      });

      const { data } = response;

      // Store the user's email in localStorage for OTP verification
      localStorage.setItem("emailForOtp", formData.email);

      // Update the state
      set({
        user: data,
        isAuthenticated: false, // Not authenticated until OTP verification is complete
        isLoading: false,
      });

      // Redirect to OTP verification page
      navigate("/verify-otp");
    } catch (error: any) {
      // console.error("Signup Error:", error);
      set({
        signUpError:
          error.response?.data?.message || "Signup failed. Please try again.",
        isLoading: false,
      });
    }
  },

  // Email Verification Function
  emailVerification: async (token) => {
    set({
      isLoading: true,
      isVerifyingOtp: true,
      verificationError: null,
      verificationSuccess: false,
    });

    try {
      // Retrieve email from localStorage
      const email = localStorage.getItem("emailForOtp");

      if (!email) {
        set({
          verificationError: "Email not found. Please try again.",
          isVerifyingOtp: false,
        });
        return;
      }

      // Send OTP and email to the backend
      const response = await axios.post(`${API_URL}/confirmEmail`, {
        email,
        token,
      });

      // Check if response contains a success message
      const { message } = response.data;

      set({
        isAuthenticated: true,
        verificationSuccess: message || "OTP Verified Successfully!",
        isVerifyingOtp: false,
      });

      // Clear localStorage and navigate after a short delay
      localStorage.removeItem("emailForOtp");
      // setTimeout(() => {
      //   navigate("/login");
      // }, 100);
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      set({
        verificationError:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
        isVerifyingOtp: false,
        isLoading: false,
      });
    }
  },

  // login: async (formData, navigate) => {
  //   set({ isLoadingLogin: true, loginError: null });

  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/login`,
  //       formData
  //     );

  //     const { data } = response;

  //     // console.log("Login Response:", data);

  //     // Store token
  //     localStorage.setItem("authToken", data.data.token.accessToken);

  //     // Update state
  //     set({
  //       isAuthenticated: true,
  //       isLoadingLogin: false,
  //       loginSuccess: true,
  //       loginError: null,
  //     });

  //     // Redirect after successful login
  //     navigate("/dashboard");
  //   } catch (error: any) {
  //     // console.error("Login Error:", error);

  //     set({
  //       loginError:
  //         error.response?.data?.message || "Login failed. Please try again.",
  //       isLoadingLogin: false,
  //     });
  //   }
  // },

  // checkAuth: () => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     set({ isAuthenticated: true });
  //   } else {
  //     set({ isAuthenticated: false });
  //   }
  // },

  login: async (formData, navigate) => {
    set({ isLoadingLogin: true, loginError: null });

    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      const { data } = response;

      // Store token
      localStorage.setItem("authToken", data.data.token.accessToken);
      localStorage.setItem("name", data.data.userDetails.fullName);
      localStorage.setItem("email", data.data.userDetails.email);
      localStorage.setItem("isAuthenticated", "true");
      // console.log("All login Response:", data);

      // console.log("Login Response:", data.data.userDetails);
      // localStorage.setItem("userData", JSON.stringify(data.data.user));

      set({
        isAuthenticated: true,
        isLoadingLogin: false,
        loginSuccess: true,
        loginError: null,
      });

      navigate("/dashboard/dashboard");
    } catch (error: any) {
      set({
        loginError:
          error.response?.data?.message || "Login failed. Please try again.",
        isLoadingLogin: false,
      });
    }
  },
  logout: (navigate: (path: string) => void) => {
    // Clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("isAuthenticated");
  
    // Update authentication state
    set({
      isAuthenticated: false,
      loginSuccess: false,
    });
  
    // Redirect to home page
    navigate("/");
  },
  
  checkAuth: () => {
    const token = localStorage.getItem("authToken");
    const authState = localStorage.getItem("isAuthenticated");

    if (token && authState === "true") {
      set({ isAuthenticated: true });
    } else {
      set({ isAuthenticated: false });
    }
  },

  // Clear Error
  clearError: () => set({ error: null, verificationError: null }),
}));
