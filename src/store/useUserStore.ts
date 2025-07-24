import { create } from "zustand";
import api from "../services/api";
import { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  userName: string;
  bankName: string;
  accountName: string;
  userSubAccountId: string;
  twjUserId: string;
  accountBalance: number;
  accountNumber: number;
  kycSet: boolean;
  passcodeSet: boolean;
  referralBonusBalance: number;
};

type UserStore = {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`${BASE_URL}/Users/userProfileDetails`);
      const data = response.data;
      set({
        user: {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email,
          phoneNumber: data.data.phoneNumber,
          dateOfBirth: data.data.dateOfBirth,
          twjUserId: data.data.twjUserId,
          accountBalance: data.data.walletBalance ?? 0,
          userName: data.data.username,
          bankName: data.data.bankName,
          userSubAccountId: data?.data?.userSubAccountId ?? "",
          accountName: data.data.accountName,
          accountNumber: data.data.accountNumber,
          kycSet: data.data.isKycComplete,
          passcodeSet: data.data.isPasscodeSet,
          referralBonusBalance: data.data.referralBonusBalance ?? 0,
        },
        loading: false,
        error: null,
      });
    } catch (e) {
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";

      set({ loading: false, error: errorMessage || "Failed to fetch user" });
    }
  },
}));
