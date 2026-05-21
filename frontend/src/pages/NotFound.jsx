import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "100px",
          color: "#2563eb",
          marginBottom: "10px",
        }}
      >
        404
      </h1>

      <h2
        style={{
          marginBottom: "15px",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          marginBottom: "25px",
          color: "#555",
        }}
      >
        The page you are looking for
        does not exist.
      </p>

      <Link
        to="/"
        style={{
          padding: "12px 20px",
          backgroundColor: "#2563eb",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;