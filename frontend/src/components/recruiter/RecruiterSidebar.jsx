import { Link, useLocation } from "react-router-dom";

const RecruiterSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
    },
    {
      name: "Post Job",
      path: "/recruiter/post-job",
    },
    {
      name: "My Jobs",
      path: "/recruiter/my-jobs",
    },
  ];

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#1e293b",
        padding: "20px",
        color: "#fff",
      }}
    >
      <Link
  to="/"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#fff",
    textDecoration: "none",
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "bold",
  }}
>
  ← Home
</Link>
      <h2
        style={{
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
      
        Recruiter Panel
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: isActive
                  ? "#2563eb"
                  : "transparent",
                color: "#fff",
                textDecoration: "none",
                transition: "0.3s",
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecruiterSidebar;