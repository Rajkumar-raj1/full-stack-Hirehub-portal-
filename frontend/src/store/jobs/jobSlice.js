import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  singleJob: null,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",

  initialState,

  reducers: {
    setJobs: (
      state,
      action
    ) => {
      state.jobs =
        action.payload;
    },

    setSingleJob: (
      state,
      action
    ) => {
      state.singleJob =
        action.payload;
    },

    addJob: (
      state,
      action
    ) => {
      state.jobs.unshift(
        action.payload
      );
    },

    updateJob: (
      state,
      action
    ) => {
      const index =
        state.jobs.findIndex(
          (job) =>
            job._id ===
            action.payload._id
        );

      if (index !== -1) {
        state.jobs[index] =
          action.payload;
      }
    },

    removeJob: (
      state,
      action
    ) => {
      state.jobs =
        state.jobs.filter(
          (job) =>
            job._id !==
            action.payload
        );
    },

    setLoading: (
      state,
      action
    ) => {
      state.loading =
        action.payload;
    },

    setError: (
      state,
      action
    ) => {
      state.error =
        action.payload;
    },

    clearJobs: (state) => {
      state.jobs = [];

      state.singleJob = null;
    },
  },
});

export const {
  setJobs,
  setSingleJob,
  addJob,
  updateJob,
  removeJob,
  setLoading,
  setError,
  clearJobs,
} = jobSlice.actions;

export default jobSlice.reducer;