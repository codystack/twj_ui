import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
  user: any;
  message: any;
  isAuthenticated: boolean;
  otpAuth: boolean;
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
  isLoadingEmailForgotPass: boolean;
  emailForgotPasswordSucces: boolean;
  emailForgotPasswordError: boolean;
  isVerifyingForgotOtp: boolean;
  ForgotOtpError: string | null;
  ForgotOtpSuccess: boolean;

  setIsAuthenticated: (status: boolean) => void;
  checkAuth: () => void;
  signUp: (
    formData: Record<string, any>,
    navigate: (path: string) => void
  ) => Promise<void>;
  emailVerification: (token: string) => Promise<void>;

  forgotpasswordVerification: (token: string) => Promise<void>;

  login: (
    formData: Record<string, any>,
    navigate: (path: string) => void
  ) => Promise<void>;
  logout: (navigate: (path: string) => void) => void;
  forgotpasswordemail: (
    formData: { emailOrPhoneNumber: string },
    navigate: (path: string) => void
  ) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  otpAuth: false,
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
  isLoadingEmailForgotPass: false,
  emailForgotPasswordSucces: false,
  emailForgotPasswordError: false,
  isVerifyingForgotOtp: true,
  ForgotOtpError: null,
  ForgotOtpSuccess: false,

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
      otpAuth: false,
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
      // console.log("data sent");
      // Check if response contains a success message
      const { message } = response.data;

      set({
        otpAuth: true,
        verificationSuccess: message || "OTP Verified Successfully!",
        isVerifyingOtp: false,
        isLoading: false,
      });
      // console.log(message)
      // console.log("succeful:", message);

      // Clear localStorage
      localStorage.removeItem("emailForOtp");
    } catch (error: any) {
      // console.error("OTP Verification Error:", error);
      set({
        otpAuth: false,
        verificationError:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
        isVerifyingOtp: false,
        isLoading: false,
      });
    }
  },

  //Fortgot password email verification
  forgotpasswordVerification: async (token) => {
    set({
      otpAuth: false,
      isLoading: true,
      isVerifyingForgotOtp: true,
      ForgotOtpError: null,
    });

    try {
      const emailOrPhoneNumber: any = localStorage.getItem(
        "forgotPasswordEmail"
      );
      if (!emailOrPhoneNumber) {
        console.error("No email found in local storage.");
        return;
      }

      // Ensure token is a string
      // if (!token || typeof token !== "string") {
      //   console.error("Invalid token format:", token);
      //   return;
      // }
      // console.log("otp in authStore is a string:", token);
      const response = await axios.post(
        `${API_URL}/ResetPasswordVerifyOtp?emailOrPhoneNumber=${emailOrPhoneNumber}`,
        { token }
      );
      // console.log("Data sent");
      // Check if response contains a success message
      const { message } = response.data;

      set({
        otpAuth: true,
        verificationSuccess: message || "OTP Verified Successfully!",
        isLoading: false,
        isVerifyingForgotOtp: false,
        ForgotOtpError: null,
        ForgotOtpSuccess: true,
      });
      // console.log(message)
      // console.log("succeful:", message);

      // Clear localStorage
      localStorage.removeItem("forgotPasswordEmail");
    } catch (error: any) {
    
      set({
        otpAuth: false,
        ForgotOtpError:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
        isVerifyingForgotOtp: false,
        isLoading: false,
      });
    }
  },

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

  forgotpasswordemail: async (formData, navigate) => {
    set({ isLoadingEmailForgotPass: true, emailForgotPasswordError: false });

    try {
      const response = await axios.post(`${API_URL}/forgotPassword`, formData);
      const { data } = response;
      console.log({ data });
      localStorage.setItem("forgotPasswordEmail", formData.emailOrPhoneNumber);
      set({
        emailForgotPasswordSucces: true,
        emailForgotPasswordError: false,
        isLoadingEmailForgotPass: false,
      });

      navigate("/auth-account");
    } catch (error: any) {
      console.error("passemail recovery Error:", error);
      set({
        emailForgotPasswordSucces: false,
        emailForgotPasswordError:
          error.response?.data?.message || "Login failed. Please try again.",
        isLoadingEmailForgotPass: false,
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
