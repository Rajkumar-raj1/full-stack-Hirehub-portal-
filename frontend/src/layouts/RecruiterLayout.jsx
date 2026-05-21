import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import RecruiterSidebar from "../components/recruiter/RecruiterSidebar.jsx";

const RecruiterLayout = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <RecruiterSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "25px",
          }}
        >
         
         
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default RecruiterLayout;