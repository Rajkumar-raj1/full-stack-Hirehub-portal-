import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice.js";
import jobReducer from "./jobs/jobSlice.js";
import applicationReducer from "./applications/applicationSlice.js";
import userReducer from "./user/userSlice.js";

export const store =
  configureStore({
    reducer: {
      auth: authReducer,

      jobs: jobReducer,

      applications:
        applicationReducer,

      users: userReducer,
    },
  });

export default store;