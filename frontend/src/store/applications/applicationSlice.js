import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const applicationSlice =
  createSlice({
    name: "applications",

    initialState,

    reducers: {
      setApplications: (
        state,
        action
      ) => {
        state.applications =
          action.payload;
      },

      addApplication: (
        state,
        action
      ) => {
        state.applications.push(
          action.payload
        );
      },

      updateApplication: (
        state,
        action
      ) => {
        const index =
          state.applications.findIndex(
            (application) =>
              application._id ===
              action.payload._id
          );

        if (index !== -1) {
          state.applications[
            index
          ] = action.payload;
        }
      },

      removeApplication: (
        state,
        action
      ) => {
        state.applications =
          state.applications.filter(
            (application) =>
              application._id !==
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

      clearApplications: (
        state
      ) => {
        state.applications = [];
      },
    },
  });

export const {
  setApplications,
  addApplication,
  updateApplication,
  removeApplication,
  setLoading,
  setError,
  clearApplications,
} = applicationSlice.actions;

export default
  applicationSlice.reducer;