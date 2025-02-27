import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface NewPasswordState {
  otpAuth: boolean;
  isLoading: boolean;
  newPasswordError: boolean | string;
  newPasswordSuccess: boolean;
  newPasswordMessage: string | null;
  verificationError?: string;
  newPasswordChange: (newPassword: string) => Promise<void>;
}

export const usenewPasswordStore = create<NewPasswordState>((set) => ({
  otpAuth: false,
  isLoading: false,
  newPasswordError: false,
  newPasswordSuccess: false,
  newPasswordMessage: null,

  newPasswordChange: async (newPassword) => {
    set({
      otpAuth: false,
      isLoading: true,
      newPasswordError: false,
      newPasswordSuccess: false,
      newPasswordMessage: null,
    });

    try {
      // Retrieve email from localStorage
      const email = localStorage.getItem("forgotPasswordEmail");
      if (!email) {
        set({
          verificationError: "Email not found. Please try again.",
          isLoading: false,
         
        });
        console.log("email not found");
        return;
      }
      console.log("email is before submition :", email);
      // Send new password request using Axios
      const response = await axios.post(
        `${API_URL}/ResetPasswordChangePassword?emailOrPhoneNumber=${email}`,
        { newPassword }
      );
      console.log("submitied");
      const message = response.data.message || "Password updated successfully!";

      set({
        isLoading: false,
        otpAuth: true,
        newPasswordMessage: message,
        newPasswordError: false,
        newPasswordSuccess: true,
      });

      // Clear localStorage
      alert("Password successfully updated!");
      localStorage.removeItem("emailForOtp");
    } catch (error: any) {
      console.error("passemail recovery Error:", error);
      set({
        otpAuth: false,
        newPasswordSuccess: false,
        newPasswordError:
          error.response?.data?.message ||
          "Password update failed. Please try again.",
        isLoading: false,
      });
    }
  },
}));
