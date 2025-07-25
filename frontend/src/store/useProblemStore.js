import { create } from "zustand";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,
  isSolvedProblemsLoading: false,

  
  setProblems: (data) => {
    set({ problems: data.problems });
  },
  setPorblem: (data) => {
    set({ problem: data });
  },
  setIsProblemsLoading: (value) => {
    set({ isProblemsLoading: value });
  },
  setIsProblemLoading: (value) => {
    set({ isProblemLoading: value });
  },
  setSolvedProblems: (data) => {
    set({ solvedProblems: data });
  },
  setIsSolvedProblemsLoading: (value) => {
    set({ isSolvedProblemsLoading: value });
  },
}));
