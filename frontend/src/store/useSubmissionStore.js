import { create } from "zustand";
export const useSubmissionStore = create((set) => ({
  isLoading: null,
  submissions: [],
  submission: null,
  submissionCount: null,

  setIsLoading: (value) => {
    set({ isLoading: value });
  },
  setSubmissions: (data) => {
    set({ submissions: data });
  },
  setSubmission: (data) => {
    set({ submission: data });
  },
  setSubmissionCount: (data) => {
    set({ submissionCount: data });
  },
}));
