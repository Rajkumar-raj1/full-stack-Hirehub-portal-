import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (
      state,
      action
    ) => {
      state.user =
        action.payload;

      state.isAuthenticated =
        !!action.payload;
    },

    logoutUser: (state) => {
      state.user = null;

      state.isAuthenticated =
        false;
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

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  logoutUser,
  setLoading,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;