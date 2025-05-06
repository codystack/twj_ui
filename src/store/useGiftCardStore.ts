// // stores/useGiftCardStore.ts
// import { create } from "zustand";

// type GiftCardStore = {
//   selectedGiftCardId: string | null;
//   setSelectedGiftCardId: (id: string) => void;
//   clearSelectedGiftCardId: () => void;
// };

// export const useGiftCardStore = create<GiftCardStore>((set) => ({
//   selectedGiftCardId: null,
//   setSelectedGiftCardId: (id) => set({ selectedGiftCardId: id }),
//   clearSelectedGiftCardId: () => set({ selectedGiftCardId: null }),
// }));

import { create } from "zustand";

type GiftCardFormData = {
  phoneNumber: string;
  amount: string;
  email: string;
  name: string;
};

type GiftCardStore = {
  selectedGiftCardId: string | null;
  formData: GiftCardFormData;
  setSelectedGiftCardId: (id: string) => void;
  clearSelectedGiftCardId: () => void;
  updateFormData: (data: Partial<GiftCardFormData>) => void;
  clearFormData: () => void;
  totalAmount: number;
  setTotalAmount: (value: number) => void;
};

export const useGiftCardStore = create<GiftCardStore>((set) => ({
  selectedGiftCardId: null,
  formData: {
    phoneNumber: "",
    amount: "",
    email: "",
    name: "",
  },
  setSelectedGiftCardId: (id) => set({ selectedGiftCardId: id }),
  clearSelectedGiftCardId: () => set({ selectedGiftCardId: null }),
  updateFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  clearFormData: () =>
    set({
      formData: {
        phoneNumber: "",
        amount: "",
        email: "",
        name: "",
      },
    }),

  totalAmount: 0,
  setTotalAmount: (value) => set({ totalAmount: value }),
}));
