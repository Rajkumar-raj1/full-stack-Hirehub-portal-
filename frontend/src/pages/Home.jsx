import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/common/Loader.jsx";
import JobList from "../components/jobs/JobList.jsx";

import { getAllJobs } from "../services/job.service.js";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const data =
          await getAllJobs();

        setJobs(data?.data || []);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background:
            "linear-gradient(to right, #2563eb, #1e3a8a)",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px",
          }}
        >
          Find Your Dream Job
        </h1>

        <p
          style={{
            fontSize: "18px",
            marginBottom: "30px",
          }}
        >
          Discover thousands of jobs from
          top companies
        </p>

        <Link
          to="/jobs"
          style={{
            padding: "12px 20px",
            backgroundColor: "#fff",
            color: "#2563eb",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Browse Jobs
        </Link>
      </section>

      {/* Latest Jobs */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "0 20px",
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
          <h2>Latest Jobs</h2>

          <Link
            to="/jobs"
            style={{
              color: "#2563eb",
            }}
          >
            View All
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <JobList
            jobs={jobs.slice(0, 6)}
          />
        )}
      </section>
    </div>
  );
};

export default Home;