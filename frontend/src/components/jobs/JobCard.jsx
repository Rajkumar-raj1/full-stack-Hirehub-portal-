import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
        }}
      >
        {job?.title}
      </h2>

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
        <strong>Experience:</strong>{" "}
        {job?.experienceLevel}
      </p>

      <div
        style={{
          marginTop: "15px",
        }}
      >
        <Link
          to={`/jobs/${job?._id}`}
          style={{
            padding: "10px 15px",
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: "6px",
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;