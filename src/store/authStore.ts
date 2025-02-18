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
    signUp: (formData: Record<string, any>, navigate: (path: string) => void) => Promise<void>;
    emailVerification: (token: string[], navigate: (path: string) => void) => Promise<void>;
    clearError: () => void;
  }


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  message: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isVerifyingOtp: false,
  verificationError: null,
  verificationSuccess: false,

  // Signup Function
  signUp: async (formData, navigate) => {
    set({ isLoading: true, error: null });

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
      console.error("Signup Error:", error);
      set({
        error: error.response?.data?.message || "Signup failed. Please try again.",
        isLoading: false,
      });
    }
  },


  // Email Verification Function
  emailVerification: async (token, navigate) => {
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
      setTimeout(() => {
        navigate("/login");
      }, 100); 
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      set({
        verificationError:
          error.response?.data?.message || "OTP verification failed. Please try again.",
        isVerifyingOtp: false,
        isLoading: false,
      });
    }
  },
  // Clear Error
  clearError: () => set({ error: null, verificationError: null }),
}));
