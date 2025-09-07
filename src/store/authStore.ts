import { create } from "zustand";
import axios from "axios";
import { decryptData, encryptData } from "../services/utils/crypto-utils";
import { useUserStore } from "./useUserStore";

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
  passcodeSet: boolean;
  kycSet: boolean | null;
  is2FASet: boolean;
  setIsAuthenticated: (status: boolean) => void;
  checkAuth: () => void;
  signUp: (
    formData: Record<string, any>,
    navigate: (path: string) => void,
    refCode?: string | null
  ) => Promise<void>;

  // signUp: (formData: FormDataType, navigate: NavigateFunction,) => Promise<void>;

  emailVerification: (token: string) => Promise<void>;
  forgotpasswordVerification: (
    token: string,
    navigate: (path: string) => void
  ) => Promise<void>;

  login: (
    formData: FormDataType,
    navigate: (path: string) => void
  ) => Promise<void>;
  logout: (navigate: (path: string) => void) => void;
  forgotpasswordemail: (
    formData: { emailOrPhoneNumber: string },
    navigate: (path: string) => void
  ) => Promise<void>;
  clearError: () => void;
}

interface FormDataType {
  email: string;
  password: string;
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
  loginError: null,
  loginSuccess: false,
  isLoadingLogin: false,
  isLoadingEmailForgotPass: false,
  emailForgotPasswordSucces: false,
  emailForgotPasswordError: false,
  isVerifyingForgotOtp: true,
  ForgotOtpError: null,
  ForgotOtpSuccess: false,
  kycSet: null,
  passcodeSet: false,
  is2FASet: true,

  setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),

  // Signup Function
  signUp: async (formData, navigate, refCode = null) => {
    set({ isLoading: true, signUpError: null });

    try {
      const response = await axios.post(
        `${API_URL}/registerUser${refCode ? `?refCode=${refCode}` : ""}`,
        {
          ...formData,
        }
      );

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
  forgotpasswordVerification: async (token, navigate) => {
    set({
      // otpAuth: false,
      isLoading: true,
      isVerifyingForgotOtp: true,
      ForgotOtpError: null,
    });

    try {
      const emailOrPhoneNumber: any = localStorage.getItem(
        "forgotPasswordEmail"
      );

      const response = await axios.post(
        `${API_URL}/ResetPasswordVerifyOtp?emailOrPhoneNumber=${emailOrPhoneNumber}`,
        { token }
      );

      // Check if response contains a success message
      const { message } = response.data;

      set({
        verificationSuccess: message || "OTP Verified Successfully!",
        isLoading: false,
        isVerifyingForgotOtp: false,
        ForgotOtpError: null,
        ForgotOtpSuccess: true,
      });

      navigate("/reset_password");
    } catch (error: any) {
      set({
        ForgotOtpError:
          error.response?.data?.message ||
          "OTP verification failed. Please try again.",
        isVerifyingForgotOtp: false,
        isLoading: false,
      });
    }
  },

  login: async (formData: FormDataType, navigate: any) => {
    // const { fetchUser } = useUserStore.getState();

    set({ isLoadingLogin: true, loginError: null });

    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      const { data } = response;

      if (data.data.requires2Fa) {
        navigate("/auth-account");
        localStorage.setItem("forgotPasswordEmail", formData.email);
        localStorage.setItem("requireTwoFa", data.data.requires2Fa);
        set({ isLoadingLogin: false });
        return;
      }

      const accessToken = data.data.token.accessToken;
      const refreshToken = data.data.token.refreshToken;

      if (!accessToken || !refreshToken) {
        throw new Error("Access or Refresh Token is missing in response");
      }

      // Retrieve last visited page

      // Encrypt tokens to local storage
      const encryptedAccessToken = encryptData(accessToken);
      const encryptedRefreshToken = encryptData(refreshToken);

      // Store encrypted tokens in localStorage
      localStorage.setItem("accessToken", encryptedAccessToken);
      localStorage.setItem("refreshToken", encryptedRefreshToken);
      localStorage.setItem("name", data.data.userDetails.fullName);
      localStorage.setItem("email", data.data.userDetails.email);
      localStorage.setItem("userName", data.data.userDetails.userName);
      localStorage.setItem("uniqueTWJID", data.data.userDetails.uniqueTWJID);
      localStorage.setItem("referralLink", data.data.userDetails.referralLink);
      localStorage.setItem("phoneNumber", data.data.userDetails.phoneNumber);
      localStorage.setItem("passcodeSet", data.data.passcodeSet);
      localStorage.setItem("kycComplete", data.data.kycComplete);
      localStorage.setItem("isAuthenticated", "true");
      const lastVisitedRoute =
        localStorage.getItem("lastVisitedRoute") || "/dashboard";
      // Clear the stored route after redirecting
      localStorage.removeItem("lastVisitedRoute");

      set({
        is2FASet: data?.data?.is2FASet,
        passcodeSet: data?.data?.passcodeSet,
        kycSet: data?.data?.kycComplete,
        isAuthenticated: true,
        isLoadingLogin: false,
        loginSuccess: true,
        loginError: null,
      });
      // await fetchUser();
      // Navigate to the last page the user was on
      navigate(lastVisitedRoute);

      // navigate("/dashboard");
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
    localStorage.setItem("forgotPasswordEmail", formData.emailOrPhoneNumber);

    try {
      const response = await axios.post(`${API_URL}/forgotPassword`, formData);
      const { data } = response;
      // console.log({ data });
      localStorage.setItem("forgotPasswordEmail", formData.emailOrPhoneNumber);
      set({
        user: data,
        emailForgotPasswordSucces: true,
        emailForgotPasswordError: false,
        isLoadingEmailForgotPass: false,
      });

      navigate("/auth-account");
    } catch (error: any) {
      // console.error("passemail recovery Error:", error);
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
    localStorage.clear();

    // Update authentication state
    set({
      isAuthenticated: false,
      loginSuccess: false,
    });

    useUserStore.setState({ user: null, loading: false, error: null });

    // Redirect to home page
    navigate("/");
  },

  checkAuth: () => {
    const getAccessToken = () => {
      const storedToken = localStorage.getItem("accessToken");
      return storedToken ? decryptData(storedToken) : null;
    };

    const token = getAccessToken();
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
