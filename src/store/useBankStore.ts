// import { create } from "zustand";
import api from "../services/api";
import { create } from "zustand";
import { useAuthorizationStore } from "./authorizationStore";

// interface Bank {
//   bankName: string;
//   bankCode: string;
// }

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
}

interface BankStore {
  bankList: BankAccount[];
  isFetchingBanks: boolean;
  fetchError: string | null;
  fetchBanks: () => Promise<void>;
}

export const useBankStore = create<BankStore>((set) => ({
  bankList: [],
  isFetchingBanks: false,
  fetchError: null,

  fetchBanks: async () => {
    const accessToken = useAuthorizationStore.getState().accessToken;
    // console.log("Access Token in fetch store:", accessToken);

    if (!accessToken) {
      set({ fetchError: "No access token available", isFetchingBanks: false });
      return;
    }

    try {
      set({ isFetchingBanks: true, fetchError: null });
      // console.log("Fetching banks...");

      const response = await api.get("/BankAccounts/get-all-bank-for-users", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach token to request
        },
      });

      set({
        bankList: response.data.data.bankAccounts,
        isFetchingBanks: false,
      });
      // console.log("Fetched banks:", response.data.data.bankAccounts);
    } catch (error: any) {
      set({
        fetchError: error.response?.data?.message || error.message,
        isFetchingBanks: false,
      });
      // console.error("Error fetching banks:", error);
    }
  },
}));
