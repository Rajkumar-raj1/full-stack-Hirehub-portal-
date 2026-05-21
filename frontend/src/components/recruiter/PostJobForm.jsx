import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

import { createJob } from "../../services/job.service.js";

const PostJobForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      company: "",
      location: "",
      salary: "",
      jobType: "Full-Time",
      experienceLevel: "",
      position: "",
      requirements: "",
    });

  const [loading, setLoading] =
    useState(false);

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

      await createJob(formData);

      alert("Job posted successfully");

      navigate("/recruiter/my-jobs");

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Failed to post job"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Post New Job
      </h2>

      <form onSubmit={handleSubmit}>

        <Input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <Input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="location"
          placeholder="Job Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <Input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="full-time">
            Full-Time
          </option>

          <option value="part-time">
            Part-Time
          </option>

          <option value="internship">
            Internship
          </option>

          <option value="remote">
            Remote
          </option>
        </select>

        <Input
          type="text"
          name="experienceLevel"
          placeholder="Experience Level"
          value={formData.experienceLevel}
          onChange={handleChange}
          required
        />

        <Input
          type="number"
          name="position"
          placeholder="Open Positions"
          value={formData.position}
          onChange={handleChange}
          required
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
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
            ? "Posting..."
            : "Post Job"}
        </Button>

      </form>
    </div>
  );
};

export default PostJobForm;