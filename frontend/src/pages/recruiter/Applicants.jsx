import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Loader from "../../components/common/Loader.jsx";

import {
  getApplicants,
  updateApplicationStatus,
} from "../../services/application.service.js";

const Applicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const data = await getApplicants(jobId);

      setApplications(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);

      alert("Application status updated");

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? { ...application, status }
            : application
        )
      );
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        Job Applicants
      </h1>

      {applications.length === 0 ? (
        <h2>No applicants found</h2>
      ) : (
        applications.map((application) => (
          <div
            key={application._id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
          >
            <h2>{application?.applicant?.fullName}</h2>

            <p>
              <strong>Email:</strong>{" "}
              {application?.applicant?.email}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {application?.status}
            </p>

            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(application?.createdAt).toLocaleDateString()}
            </p>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to={`/recruiter/applicant-profile/${application?.applicant?._id}`}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
              >
                View Applicant Profile
              </Link>

              {application?.resume?.url && (
                <a
                  href={application.resume.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#6366f1",
                    color: "#fff",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  View Resume
                </a>
              )}

              <button
                onClick={() =>
                  handleStatusUpdate(application._id, "accepted")
                }
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Accept
              </button>

              <button
                onClick={() =>
                  handleStatusUpdate(application._id, "rejected")
                }
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Applicants;