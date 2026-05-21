import axiosInstance from "./axios.js";

// Apply To Job
export const applyToJob = async (
  jobId,
  resumeFile
) => {
  const formData = new FormData();

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  const response = await axiosInstance.post(
    `/applications/apply/${jobId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Logged In User Applications
export const getMyApplications =
  async () => {
    const response =
      await axiosInstance.get(
        "/applications/my-applications"
      );

    return response.data;
  };

// Get Applicants For Recruiter Job
export const getApplicants = async (
  jobId
) => {
  const response = await axiosInstance.get(
    `/applications/applicants/${jobId}`
  );

  return response.data;
};

// Update Application Status
export const updateApplicationStatus =
  async (applicationId, status) => {
    const response =
      await axiosInstance.patch(
        `/applications/status/${applicationId}`,
        { status }
      );

    return response.data;
  };