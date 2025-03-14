import { create } from "zustand";

interface Bank {
  bankName: string;
  bankCode: string;
}

interface BankStore {
  bankList: Bank[];
  isFetchingBanks: boolean;
  fetchError: string | null;
  fetchBanks: (context: { queryKey: [string, string] }) => Promise<Bank[]>;
}

export const useBankStore = create<BankStore>((set) => ({
  bankList: [],
  isFetchingBanks: false,
  fetchError: null,

  fetchBanks: async ({ queryKey }) => {
    const [, token] = queryKey; // Extract token from queryKey

    try {
      set({ isFetchingBanks: true, fetchError: null });

      const response = await fetch("https://twjmobileapi.runasp.net/api/BankAccounts/get-all-bank-for-users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch banks");
      }

      const data = await response.json();
      set({ bankList: data, isFetchingBanks: false });
      return data; // Return data for React Query
    } catch (error: any) {
      set({ fetchError: error.message, isFetchingBanks: false });
      throw error;
    }
  },
}));
