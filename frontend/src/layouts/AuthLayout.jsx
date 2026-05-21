import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to right, #2563eb, #1e3a8a)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow:
            "0 0 20px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <h1
              style={{
                color: "#2563eb",
              }}
            >
              HireHub
            </h1>
          </Link>

          <p
            style={{
              marginTop: "10px",
              color: "#555",
            }}
          >
            Welcome to the Job Portal
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;