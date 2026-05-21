import JobCard from "./JobCard.jsx";

const JobList = ({ jobs = [] }) => {
  if (jobs.length === 0) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        No jobs found
      </h2>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
      }}
    >
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
        />
      ))}
    </div>
  );
};

export default JobList;