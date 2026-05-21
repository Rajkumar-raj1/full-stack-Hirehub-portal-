import { useEffect, useState } from "react";

import Loader from "../components/common/Loader.jsx";
import ProfileCard from "../components/profile/ProfileCard.jsx";

import { getUserProfile } from "../services/user.service.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data = await getUserProfile();

        setUser(data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loader />;

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>User not found</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
      }}
    >
      <ProfileCard user={user} setUser={setUser} />
    </div>
  );
};

export default Profile;