
import api from "../services/api";
import { create } from "zustand";
import { decryptData } from "../services/utils/crypto-utils";



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
    // const accessToken = useAuthorizationStore.getState().accessToken;
    const getAccessToken = () => {
      const storedToken = localStorage.getItem('accessToken');
      return storedToken ? decryptData(storedToken) : null;
  };
  
  const accessToken = getAccessToken();
    // console.log("Access Token in fetch store:", accessToken);

    if (!accessToken) {
      set({ fetchError: "No access token available", isFetchingBanks: false });
      return;
    }


    try {
      set({ isFetchingBanks: true, fetchError: null });
    
      const response = await api.get("/BankAccounts/getAllBankForUsers");
    
      set({
        bankList: response.data.data.bankAccounts,
        isFetchingBanks: false,
      });
    } catch (error: any) {
      set({
        fetchError: error.response?.data?.message || error.message,
        isFetchingBanks: false,
      });
    }
    
  },
}));
