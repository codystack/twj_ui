// import { create } from "zustand";
// import { useAuthorizationStore } from "./authorizationStore";
// // import { useAuthStore } from "../path-to-auth-store"; // Import your auth store

// const BASE_URL = import.meta.env.VITE_API_URL;

// interface Bank {
//   bankName: string;
//   bankCode: string;
// }

// interface BankStore {
//   bankList: Bank[];
//   isFetchingBanks: boolean;
//   fetchError: string | null;
//   fetchBanks: () => Promise<void>; // No need for queryKey now
// }

// export const useBankStore = create<BankStore>((set) => ({
//   bankList: [],
//   isFetchingBanks: false,
//   fetchError: null,

//   fetchBanks: async () => {
//     const accessToken = useAuthorizationStore.getState().accessToken; // Get token from auth store
//     console.log("Access Token in fetch store:", accessToken);

//     if (!accessToken) {
//       set({ fetchError: "No access token available", isFetchingBanks: false });
//       return;
//     }

//     try {
//       set({ isFetchingBanks: true, fetchError: null });
//       console.log("Fetching banks...");
//       console.log(BASE_URL);

//       const response = await fetch(
//         `${BASE_URL}/BankAccounts/get-all-bank-for-users`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch banks");
//       }

//       const data = await response.json();
//       set({ bankList: data, isFetchingBanks: false });
//     } catch (error: any) {
//       set({ fetchError: error.message, isFetchingBanks: false });
//     }
//   },
// }));

// import { create } from "zustand";
import api from "../services/api";
import { create } from "zustand";
import { useAuthorizationStore } from "./authorizationStore";

interface Bank {
  bankName: string;
  bankCode: string;
}

interface BankStore {
  bankList: Bank[];
  isFetchingBanks: boolean;
  fetchError: string | null;
  fetchBanks: () => Promise<void>;
}

export const useBankStore = create<BankStore>((set) => ({
  bankList: [],
  isFetchingBanks: false,
  fetchError: null,

  fetchBanks: async () => {
    const accessToken = useAuthorizationStore.getState().accessToken; // Get token from auth store
    console.log("Access Token in fetch store:", accessToken);

    if (!accessToken) {
      set({ fetchError: "No access token available", isFetchingBanks: false });
      return;
    }

    try {
      set({ isFetchingBanks: true, fetchError: null });
      console.log("Fetching banks...");

      const response = await api.get("/BankAccounts/get-all-bank-for-users", {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach token to request
        },
      });

      set({ bankList: response.data, isFetchingBanks: false });
      console.log("Fetched banks:", response.data);
    } catch (error: any) {
      set({ fetchError: error.response?.data?.message || error.message, isFetchingBanks: false });
      console.error("Error fetching banks:", error);
    }
  },
}));
