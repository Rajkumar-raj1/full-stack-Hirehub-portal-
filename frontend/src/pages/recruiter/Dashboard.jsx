import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/common/Loader.jsx";

import {
  getRecruiterJobs,
} from "../../services/job.service.js";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchDashboardData =
      async () => {
        try {
          setLoading(true);

          const data =
            await getRecruiterJobs(
              user?._id
            );

          setJobs(data?.data || []);

        } catch (error) {
          console.log(error);

        } finally {
          setLoading(false);
        }
      };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Recruiter Dashboard
      </h1>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow:
              "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>{jobs.length}</h2>

          <p>Total Jobs Posted</p>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow:
              "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>
            {jobs.reduce(
              (acc, job) =>
                acc +
                (job.position || 0),
              0
            )}
          </h2>

          <p>Total Open Positions</p>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          gap: "15px",
        }}
      >
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

        <Link
          to="/recruiter/my-jobs"
          style={{
            padding: "10px 15px",
            backgroundColor: "#10b981",
            color: "#fff",
            borderRadius: "6px",
          }}
        >
          Manage Jobs
        </Link>
      </div>

      {/* Recent Jobs */}
      <div>
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Recent Posted Jobs
        </h2>

        {jobs.length === 0 ? (
          <h3>No jobs posted yet</h3>
        ) : (
          jobs.slice(0, 5).map((job) => (
            <div
              key={job._id}
              style={{
                backgroundColor:
                  "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow:
                  "0 0 10px rgba(0,0,0,0.1)",
                marginBottom: "20px",
              }}
            >
              <h3>{job.title}</h3>

              <p>
                <strong>
                  Company:
                </strong>{" "}
                {job.company}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {job.location}
              </p>

              <p>
                <strong>
                  Salary:
                </strong>{" "}
                ₹{job.salary}
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
                    padding:
                      "8px 12px",
                    backgroundColor:
                      "#2563eb",
                    color: "#fff",
                    borderRadius:
                      "6px",
                  }}
                >
                  View
                </Link>

                <Link
                  to={`/recruiter/applicants/${job._id}`}
                  style={{
                    padding:
                      "8px 12px",
                    backgroundColor:
                      "#10b981",
                    color: "#fff",
                    borderRadius:
                      "6px",
                  }}
                >
                  Applicants
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;