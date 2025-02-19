import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  checkAuth: () => void;
  setIsAuthenticated: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  // Check if token exists in localStorage
  checkAuth: () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      set({ isAuthenticated: true });
    } else {
      set({ isAuthenticated: false });
    }
  },

  setIsAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
}));
