import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

import { registerUser } from "../../services/auth.service.js";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "jobseeker",
    company: "",
  });

  const [profilePhoto, setProfilePhoto] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const submitData = new FormData();

      submitData.append(
        "fullName",
        formData.fullName
      );

      submitData.append(
        "username",
        formData.username
      );

      submitData.append(
        "email",
        formData.email
      );

      submitData.append(
        "password",
        formData.password
      );

      submitData.append(
        "role",
        formData.role
      );

      if (profilePhoto) {
        submitData.append(
          "profilePhoto",
          profilePhoto
        );
      }
if (formData.role === "recruiter") {
  submitData.append("company", formData.company);
}
      await registerUser(submitData);

      alert("Registration successful");

      navigate("/login");

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "450px",
        margin: "50px auto",
        padding: "25px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Register
      </h2>

      <form onSubmit={handleSubmit}>

        <Input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

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

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="jobseeker">
            Job Seeker
          </option>

          <option value="recruiter">
            Recruiter
          </option>
        </select>
{formData.role === "recruiter" && (
  <Input
    type="text"
    name="company"
    placeholder="Company Name"
    value={formData.company}
    onChange={handleChange}
    required
  />
)}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            marginBottom: "20px",
          }}
        />

        <Button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
          }}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </Button>
<p
  style={{
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  }}
>
  Already have an account?{" "}
  <Link
    to="/login"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Login
  </Link>
</p>
      </form>
    </div>
  );
};

export default RegisterForm;