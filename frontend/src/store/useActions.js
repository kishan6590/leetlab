import { create } from "zustand";
export const useAction = create((set) => ({
  isDeletingProblem : false, 
  setIsDeletingProblem: (value) => {
    set({ isDeletingProblem: value })
  }
}));
