import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader.jsx";

import {
  getRecruiterJobs,
  deleteJob,
} from "../../services/job.service.js";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchRecruiterJobs =
    async () => {
      try {
        setLoading(true);

        const data =
          await getRecruiterJobs();

        setJobs(data?.data || []);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchRecruiterJobs();
  }, []);

  const handleDelete = async (
    jobId
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(jobId);

      alert("Job deleted successfully");

      setJobs((prev) =>
        prev.filter(
          (job) => job._id !== jobId
        )
      );

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>My Posted Jobs</h1>

        <Link
          to="/recruiter/post-job"
          style={{
            padding: "10px 15px",
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: "6px",
          }}
        >
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <h2>No jobs posted yet</h2>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 0 10px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
          >
            <h2>{job.title}</h2>

            <p>
              <strong>Company:</strong>{" "}
              {job.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {job.location}
            </p>

            <p>
              <strong>Salary:</strong> ₹
              {job.salary}
            </p>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
              }}
            >
              <Link
                to={`/jobs/${job._id}`}
                style={{
                  padding: "8px 12px",
                  backgroundColor:
                    "#2563eb",
                  color: "#fff",
                  borderRadius: "6px",
                }}
              >
                View
              </Link>
   <Link
  to={`/recruiter/edit-job/${job._id}`}
  style={{
    padding: "8px 12px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    borderRadius: "6px",
  }}
>
  Edit
</Link>
              <Link
                to={`/recruiter/applicants/${job._id}`}
                style={{
                  padding: "8px 12px",
                  backgroundColor:
                    "#10b981",
                  color: "#fff",
                  borderRadius: "6px",
                }}
              >
                Applicants
              </Link>

              <button
                onClick={() =>
                  handleDelete(job._id)
                }
                style={{
                  padding: "8px 12px",
                  backgroundColor:
                    "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyJobs;