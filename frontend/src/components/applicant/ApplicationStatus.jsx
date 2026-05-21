const ApplicationStatus = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "#f59e0b";

      case "accepted":
        return "#10b981";

      case "rejected":
        return "#ef4444";

      default:
        return "#6b7280";
    }
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "20px",
        backgroundColor: getStatusColor(),
        color: "#fff",
        fontSize: "14px",
        fontWeight: "bold",
        marginTop: "5px",
      }}
    >
      {status || "pending"}
    </span>
  );
};

export default ApplicationStatus;