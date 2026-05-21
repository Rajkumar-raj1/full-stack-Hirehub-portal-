import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../../components/common/Loader.jsx";
import ProfileCard from "../../components/profile/ProfileCard.jsx";

import { getUserById } from "../../services/user.service.js";

const ApplicantProfile = () => {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        setLoading(true);

        const data = await getUserById(userId);

        setUser(data?.data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchApplicant();
  }, [userId]);

  if (loading) return <Loader />;

  if (!user) {
    return <h2>Applicant not found</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
      }}
    >
      <ProfileCard
  user={user}
  setUser={setUser}
  readOnly={true}
/>
    </div>
  );
};

export default ApplicantProfile;