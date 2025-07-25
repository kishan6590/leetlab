import { create } from "zustand";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,
  setIsExecuting: (value) => {
    set({ isExecuting: value });
  },
  setSubmission: (data) => {
    set({ submission: data });
  },
}));
