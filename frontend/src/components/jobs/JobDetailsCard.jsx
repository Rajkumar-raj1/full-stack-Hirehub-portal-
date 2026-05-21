import { useState } from "react";

import Button from "../common/Button.jsx";

import { applyToJob } from "../../services/application.service.js";

const JobDetailsCard = ({ job }) => {
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);

      await applyToJob(job?._id);

      alert("Applied successfully");

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to apply"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        {job?.title}
      </h1>

      <p>
        <strong>Company:</strong>{" "}
        {job?.company}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {job?.location}
      </p>

      <p>
        <strong>Salary:</strong> ₹
        {job?.salary}
      </p>

      <p>
        <strong>Job Type:</strong>{" "}
        {job?.jobType}
      </p>

      <p>
        <strong>Experience Level:</strong>{" "}
        {job?.experienceLevel}
      </p>

      <p>
        <strong>Position:</strong>{" "}
        {job?.position}
      </p>

      <p>
        <strong>Posted By:</strong>{" "}
        {job?.createdBy?.fullName}
      </p>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h3>Description</h3>

        <p
          style={{
            marginTop: "10px",
            lineHeight: "1.7",
          }}
        >
          {job?.description}
        </p>
      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        {JSON.parse(localStorage.getItem("user"))?.role === "jobseeker" && (
  <Button
    onClick={handleApply}
    disabled={loading}
  >
    {loading ? "Applying..." : "Apply Now"}
  </Button>
)}
      </div>
    </div>
  );
};

export default JobDetailsCard;