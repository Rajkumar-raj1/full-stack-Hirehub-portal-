import axiosInstance from "./axios.js";

// Get Current User
export const getUserProfile = async () => {
  const response = await axiosInstance.get(
    "/users/current-user"
  );

  return response.data;
};

// Update Account Details
export const updateUserProfile = async (userData) => {
  const response = await axiosInstance.patch(
    "/users/update-account",
    userData
  );

  return response.data;
};

// Update Profile Photo
export const updateProfilePhoto = async (formData) => {
  const response = await axiosInstance.patch(
    "/users/update-profile-photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Upload Resume
export const uploadResume = async (formData) => {
  const response = await axiosInstance.patch(
    "/users/upload-resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const response = await axiosInstance.patch(
    "/users/change-password",
    passwordData
  );

  return response.data;
};

// Logout User
export const logoutUserProfile = async () => {
  const response = await axiosInstance.post(
    "/users/logout"
  );

  return response.data;
};
export const getUserById = async (userId) => {
  const response = await axiosInstance.get(
    `/users/${userId}`
  );

  return response.data;
};