import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    return JSON.parse(storedUser);
  }

  return null;
});

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#111827",
        color: "#fff",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        HireHub
      </Link>

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link to="/">Home</Link>

        <Link to="/jobs">Jobs</Link>

        {user?.role === "jobseeker" && (
  <Link to="/my-applications">
    My Applications
  </Link>
)}

        {user?.role === "recruiter" && (
          <>
            <Link to="/recruiter/dashboard">
              Dashboard
            </Link>

            <Link to="/recruiter/post-job">
              Post Job
            </Link>

            <Link to="/recruiter/my-jobs">
              My Jobs
            </Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              {user.fullName}
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "8px 14px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: "#2563eb",
                color: "#fff",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;