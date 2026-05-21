const ApplicantsTable = ({
  applications,
  onStatusChange,
}) => {
  if (applications.length === 0) {
    return (
      <h2>No applicants found</h2>
    );
  }

  return (
    <div
      style={{
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow:
            "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor:
                "#2563eb",
              color: "#fff",
            }}
          >
            <th
              style={{
                padding: "15px",
                textAlign: "left",
              }}
            >
              Applicant
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "left",
              }}
            >
              Email
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "left",
              }}
            >
              Status
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "left",
              }}
            >
              Resume
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "left",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {applications.map(
            (application) => (
              <tr
                key={application._id}
                style={{
                  borderBottom:
                    "1px solid #ddd",
                }}
              >
                <td
                  style={{
                    padding: "15px",
                  }}
                >
                  {
                    application
                      ?.applicant
                      ?.fullName
                  }
                </td>

                <td
                  style={{
                    padding: "15px",
                  }}
                >
                  {
                    application
                      ?.applicant
                      ?.email
                  }
                </td>

                <td
                  style={{
                    padding: "15px",
                    textTransform:
                      "capitalize",
                  }}
                >
                  {
                    application?.status
                  }
                </td>

                <td
                  style={{
                    padding: "15px",
                  }}
                >
                  {application?.resume ? (
                    <a
                      href={
                        application.resume
                      }
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color:
                          "#2563eb",
                      }}
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>

                <td
                  style={{
                    padding: "15px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      onStatusChange(
                        application._id,
                        "accepted"
                      )
                    }
                    style={{
                      padding:
                        "6px 10px",
                      border: "none",
                      borderRadius:
                        "6px",
                      backgroundColor:
                        "#10b981",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      onStatusChange(
                        application._id,
                        "rejected"
                      )
                    }
                    style={{
                      padding:
                        "6px 10px",
                      border: "none",
                      borderRadius:
                        "6px",
                      backgroundColor:
                        "#ef4444",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;