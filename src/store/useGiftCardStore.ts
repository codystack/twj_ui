import { create } from "zustand";

type GiftCardFormData = {
  phoneNumber: string;
  amount: string;
  rangeAmount: string;
  email: string;
  name: string;
};

// types for all gift cards
interface Countrys {
  isoName: string;
  name: string;
  flagUrl: string;
}

interface Category {
  id: number;
  name: string;
}

interface Brand {
  brandId: number;
  brandName: string;
}

interface RedeemInstruction {
  concise: string;
  verbose: string;
}

interface GiftCard {
  productId: number;
  productName: string;
  global: boolean;
  status: string;
  // status: string;
  supportsPreOrder: boolean;
  senderFee: number;
  senderFeePercentage: number;
  discountPercentage: number;
  denominationType: string;
  recipientCurrencyCode: string;
  senderCurrencyCode: string;
  minRecipientDenomination: number | null;
  maxRecipientDenomination: number | null;
  minSenderDenomination: number | null;
  maxSenderDenomination: number | null;
  fixedRecipientDenominations: number[];
  fixedSenderDenominations: number[];
  fixedRecipientToSenderDenominationsMap: Record<string, number>;
  metadata: Record<string, any>;
  logoUrls: string[];
  brand: Brand;
  category: Category;
  country: Countrys;
  redeemInstruction: RedeemInstruction;
  additionalRequirements: {
    userIdRequired: boolean;
  };
}

type GiftCardStore = {
  selectedGiftCardId: string | null;
  formData: GiftCardFormData;
  setSelectedGiftCardId: (id: string) => void;
  clearSelectedGiftCardId: () => void;
  updateFormData: (data: Partial<GiftCardFormData>) => void;
  clearFormData: () => void;
  totalAmount: number;
  count: number;
  allCards: GiftCard[];
  showSuccessModal: boolean;
  productIso: string | null;
  setTotalAmount: (value: number) => void;
  setCount: (value: number) => void;
  setProductIso: (value: string | null) => void;
  setAllCards: (cards: GiftCard[] | ((prev: GiftCard[]) => GiftCard[])) => void;
  setShowSuccessModal: (value: boolean) => void;
};

export const useGiftCardStore = create<GiftCardStore>((set) => ({
  selectedGiftCardId: null,
  formData: {
    phoneNumber: "",
    amount: "",
    email: "",
    name: "",
    rangeAmount: "",
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
        rangeAmount: "",
        email: "",
        name: "",
      },
    }),

  totalAmount: 0,
  setTotalAmount: (value) => set({ totalAmount: value }),

  count: 1,
  setCount: (value) => set({ count: value }),

  productIso: null,
  setProductIso: (value) => set({ productIso: value }),

  allCards: [],
  // setAllCards: (cards) => set({ allCards: cards }),
  setAllCards: (cards) =>
    set((state) => ({
      allCards: typeof cards === "function" ? cards(state.allCards) : cards,
    })),

  showSuccessModal: false,
  setShowSuccessModal: (value) => set({ showSuccessModal: value }),
}));
