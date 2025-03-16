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

  // ✅ Function to update both tokens
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),




//   setTokens: (accessToken, refreshToken) => {
//     console.log("Updating tokens in store:");
//     console.log("Access Token from store:", accessToken);
//     console.log("Refresh Token from store:", refreshToken);

//     set({ accessToken, refreshToken });
//   },
  
// console.log("accessToken", accessToken, "refresh", refreshToken);

  // ✅ Function to clear tokens on logout
  clearTokens: () => set({ accessToken: null, refreshToken: null }),
}));
