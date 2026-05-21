import axiosInstance from "./axios.js";

// Register User
export const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/users/register",
    userData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axiosInstance.post(
    "/users/login",
    userData
  );

  return response.data;
};

// Logout User
export const logoutUser = async () => {
  const response = await axiosInstance.post(
    "/users/logout"
  );

  return response.data;
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await axiosInstance.get(
    "/users/current-user"
  );

  return response.data;
};

// Update Profile
export const updateProfile = async (userData) => {
  const response = await axiosInstance.patch(
    "/users/update-profile",
    userData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};