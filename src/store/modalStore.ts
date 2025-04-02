import { create } from "zustand";

interface ModalState {
  isSuccessModal: boolean;
  passcodeSet: boolean;  // Tracks whether the PIN has been set
  showPinModal: boolean;  // Controls overall modal visibility
  setPinModal: boolean;   // Controls visibility of SetPinModal specifically
  setSuccessModal: (value: boolean) => void;
  setPasscodeSet: (value: boolean) => void;  // Set passcode status
  setShowPinModal: (value: boolean) => void;  // Show/Hide pin modal
  setSetPinModal: (value: boolean) => void;   // Show/Hide SetPinModal
}

export const useModalStore = create<ModalState>((set) => ({
  isSuccessModal: false,
  passcodeSet: localStorage.getItem("passcodeSet") === "true",  // Default to value stored in localStorage
  showPinModal: false,  // Show or hide the modal for entering the PIN
  setPinModal: false,   // Controls visibility of SetPinModal
  setSuccessModal: (value: boolean) => set({ isSuccessModal: value }),
  setPasscodeSet: (value: boolean) => {
    localStorage.setItem("passcodeSet", JSON.stringify(value));  // Store passcode status in localStorage
    set({ passcodeSet: value });
  },
  setShowPinModal: (value: boolean) => set({ showPinModal: value }),
  setSetPinModal: (value: boolean) => set({ setPinModal: value }),  // Control SetPinModal visibility
}));
