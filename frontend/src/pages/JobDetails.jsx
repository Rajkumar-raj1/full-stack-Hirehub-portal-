import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/common/Loader.jsx";
import JobDetailsCard from "../components/jobs/JobDetailsCard.jsx";

import { getJobById } from "../services/job.service.js";

const JobDetails = () => {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);

        const data = await getJobById(jobId);

        setJob(data?.data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Job not found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
      }}
    >
      <JobDetailsCard job={job} />
    </div>
  );
};

export default JobDetails;