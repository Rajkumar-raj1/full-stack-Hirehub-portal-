import { useEffect, useState } from "react";

import Loader from "../../components/common/Loader.jsx";
import AppliedJobCard from "../../components/applicant/AppliedJobCard.jsx";

import { getMyApplications } from "../../services/application.service.js";

const MyApplications = () => {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          setLoading(true);

          const data =
            await getMyApplications();

          setApplications(
            data?.data || []
          );

        } catch (error) {
          console.log(error);

        } finally {
          setLoading(false);
        }
      };

    fetchApplications();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
        My Applications
      </h1>

      {applications.length === 0 ? (
        <h2>No applications found</h2>
      ) : (
        applications.map((application) => (
          <AppliedJobCard
            key={application._id}
            application={application}
          />
        ))
      )}
    </div>
  );
};

export default MyApplications;