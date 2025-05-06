// stores/useGiftCardStore.ts
import { create } from "zustand";

type GiftCardStore = {
  selectedGiftCardId: string | null;
  setSelectedGiftCardId: (id: string) => void;
  clearSelectedGiftCardId: () => void;
};

export const useGiftCardStore = create<GiftCardStore>((set) => ({
  selectedGiftCardId: null,
  setSelectedGiftCardId: (id) => set({ selectedGiftCardId: id }),
  clearSelectedGiftCardId: () => set({ selectedGiftCardId: null }),
}));
