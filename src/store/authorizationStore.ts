import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthorizationStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

  clearTokens: () => set({ accessToken: null, refreshToken: null }),
}));


// this is currently not used in this app