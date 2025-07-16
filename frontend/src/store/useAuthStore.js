import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingUp: false,
  isCheckingAuth: false,

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
}));
