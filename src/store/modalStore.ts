import { create } from "zustand";
import api from "../services/api";

interface ModalState {
  // Passcode state
  passcodeSet: boolean;

  // Airetime Modal
  isSuccessModalStore: boolean;
  showPinModal: boolean;
  setPinModal: boolean;

  // loading state
  isloading: boolean;
  setIsLoading: (value: boolean) => void;
  // Data Pin Modal
  setDataPinModal: boolean;
  showDataPinModal: boolean;
  isDataSuccessModal: boolean;

  // passcode state
  setPasscodeSet: (value: boolean) => void;

  // Airtime Modal
  setSuccessModalStore: (value: boolean) => void;
  setShowPinModal: (value: boolean) => void;
  setSetPinModal: (value: boolean) => void;

  // Data Pin Modal
  setSetDataPinModal: (value: boolean) => void;
  setshowDataPinModal: (value: boolean) => void;
  setDataSuccessModal: (value: boolean) => void;

  // Plan-related state
  plan: any;
  isFetchingPlan: boolean;
  planError: string | null;
  fetchPlan: (network: string) => Promise<void>;
}

export const useModalStore = create<ModalState>((set) => ({
  // Passcode state
  passcodeSet: localStorage.getItem("passcodeSet") === "true",

  // airtime Modal state
  isSuccessModalStore: false,
  showPinModal: false,
  setPinModal: false,

  // Data Pin Modal state
  isDataSuccessModal: false,
  showDataPinModal: false,
  setDataPinModal: false,

  // loading state
  isloading: false,
  setIsLoading: (value: boolean) => set({ isloading: value }),

  // Passcode state
  setPasscodeSet: (value: boolean) => {
    localStorage.setItem("passcodeSet", JSON.stringify(value));
    set({ passcodeSet: value });
  },

  // Airtime Modal state
  setSuccessModalStore: (value: boolean) => set({ isSuccessModalStore: value }),
  setShowPinModal: (value: boolean) => set({ showPinModal: value }),
  setSetPinModal: (value: boolean) => set({ setPinModal: value }),

  // Data Pin Modal state
  setDataSuccessModal: (value: boolean) => set({ isSuccessModalStore: value }),
  setshowDataPinModal: (value: boolean) => set({ showPinModal: value }),
  setSetDataPinModal: (value: boolean) => set({ setPinModal: value }),

  // Plan state
  plan: null,
  isFetchingPlan: false,
  planError: null,

  fetchPlan: async (network: string) => {
    set({ isFetchingPlan: true, planError: null });
    try {
      const response = await api.get(
        `BillsPayment/getDataBundles?network=${network}`
      );
      set({ plan: response.data.data[0]?.plans || [], isFetchingPlan: false });
      // console.log("Plan data in store:",);
    } catch (error: any) {
      set({
        planError: error.response?.data?.message || error.message,
        isFetchingPlan: false,
      });
    }
  },
}));
