import { useEffect, useState } from "react";

import JobList from "../components/jobs/JobList.jsx";
import JobSearch from "../components/jobs/JobSearch.jsx";
import JobFilter from "../components/jobs/JobFilter.jsx";

import Loader from "../components/common/Loader.jsx";

import { getAllJobs } from "../services/job.service.js";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experienceLevel: "",
  });

  const fetchJobs = async (
    searchKeyword = ""
  ) => {
    try {
      setLoading(true);

      const data = await getAllJobs(
        searchKeyword
      );

      let filteredJobs = data?.data || [];

      // Frontend Filtering
      filteredJobs = filteredJobs.filter(
        (job) => {
          const locationMatch =
            !filters.location ||
            job.location ===
              filters.location;

          const typeMatch =
            !filters.jobType ||
            job.jobType ===
              filters.jobType;

          const experienceMatch =
            !filters.experienceLevel ||
            job.experienceLevel ===
              filters.experienceLevel;

          return (
            locationMatch &&
            typeMatch &&
            experienceMatch
          );
        }
      );

      setJobs(filteredJobs);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(keyword);
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Available Jobs
      </h1>

      <JobSearch
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={fetchJobs}
      />

      <JobFilter
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (
        <Loader />
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
};

export default Jobs;