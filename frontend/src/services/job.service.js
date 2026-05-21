import axiosInstance from "./axios.js";

// Get All Jobs
export const getAllJobs = async (
  keyword = ""
) => {
  const response =
    await axiosInstance.get(
      `/jobs?keyword=${keyword}`
    );

  return response.data;
};

// Get Single Job
export const getJobById = async (
  jobId
) => {
  const response =
    await axiosInstance.get(
      `/jobs/${jobId}`
    );

  return response.data;
};

// Create Job
export const createJob = async (
  jobData
) => {
  const response =
    await axiosInstance.post(
      "/jobs",
      jobData
    );

  return response.data;
};

// Update Job
export const updateJob = async (
  jobId,
  jobData
) => {
  const response =
    await axiosInstance.patch(
      `/jobs/${jobId}`,
      jobData
    );

  return response.data;
};

// Delete Job
export const deleteJob = async (
  jobId
) => {
  const response =
    await axiosInstance.delete(
      `/jobs/${jobId}`
    );

  return response.data;
};

// Get Recruiter Jobs
export const getRecruiterJobs =
  async () => {
    const response =
      await axiosInstance.get(
        "/jobs/recruiter-jobs"
      );

    return response.data;
  };