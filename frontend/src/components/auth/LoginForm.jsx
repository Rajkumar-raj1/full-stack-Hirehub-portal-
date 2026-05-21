import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

import { loginUser } from "../../services/auth.service.js";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // Save token & user
      localStorage.setItem(
        "accessToken",
        data?.data?.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data?.data?.user)
      );

      alert("Login successful");

      // Redirect by role
      // Redirect by role
if (data?.data?.user?.role === "recruiter") {
  window.location.href =
    "/recruiter/dashboard";
} else {
  window.location.href = "/";
}

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "60px auto",
        padding: "25px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Login
      </h2>

      <form onSubmit={handleSubmit}>

        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <p
  style={{
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  }}
>
  New user?{" "}
  <Link
    to="/register"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Register
  </Link>
</p>

      </form>
    </div>
  );
};

export default LoginForm;