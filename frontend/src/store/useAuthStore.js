import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingUp: false,
  isCheckingAuth: false,
  isLoading: true,

  setAuthUser: (user) => {
    set({ authUser: user });
  },
  setIsSigninUp: (value) => {
    set({ isSigninUp: value });
  },

  setIsLoggingUp: (value) => {
    set({ isLoggingUp: value });
  },
  setIsCheckingAuth: (value) => {
    set({ isCheckingAuth: value });
  },
  setIsLoading: (value) => {
    set({ isLoading: value });
  },
}));
