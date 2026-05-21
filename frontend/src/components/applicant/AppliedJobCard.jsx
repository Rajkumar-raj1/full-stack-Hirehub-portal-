import ApplicationStatus from "./ApplicationStatus.jsx";

const AppliedJobCard = ({ application }) => {
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
        {application?.job?.title}
      </h2>

      <p>
        <strong>Company:</strong>{" "}
        {application?.job?.company}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {application?.job?.location}
      </p>

      <p>
        <strong>Salary:</strong> ₹
        {application?.job?.salary}
      </p>

      <p>
        <strong>Status:</strong>
      </p>

      <ApplicationStatus
        status={application?.status}
      />

      <p
        style={{
          marginTop: "10px",
        }}
      >
        <strong>Applied On:</strong>{" "}
        {new Date(
          application?.createdAt
        ).toLocaleDateString()}
      </p>

      {application?.resume && (
        <a
          href={application.resume}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: "15px",
            color: "#2563eb",
            fontWeight: "bold",
          }}
        >
          View Resume
        </a>
      )}
    </div>
  );
};

export default AppliedJobCard;