import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    setProfile: (
      state,
      action
    ) => {
      state.profile =
        action.payload;
    },

    updateProfile: (
      state,
      action
    ) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },

    setUsers: (
      state,
      action
    ) => {
      state.users =
        action.payload;
    },

    addUser: (
      state,
      action
    ) => {
      state.users.push(
        action.payload
      );
    },

    removeUser: (
      state,
      action
    ) => {
      state.users =
        state.users.filter(
          (user) =>
            user._id !==
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

    clearUserState: (
      state
    ) => {
      state.profile = null;

      state.users = [];
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setUsers,
  addUser,
  removeUser,
  setLoading,
  setError,
  clearUserState,
} = userSlice.actions;

export default userSlice.reducer;