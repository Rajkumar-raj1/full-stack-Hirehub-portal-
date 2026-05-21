import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Loader from "../../components/common/Loader.jsx";

import {
  getJobById,
  updateJob,
} from "../../services/job.service.js";

const EditJob = () => {
  const { jobId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);

        const data =
          await getJobById(jobId);

        const job = data?.data;

        setFormData({
          title: job?.title || "",
          description:
            job?.description || "",
          company:
            job?.company || "",
          location:
            job?.location || "",
          salary:
            job?.salary || "",
          jobType:
            job?.jobType ||
            "Full-Time",
          experienceLevel:
            job?.experienceLevel ||
            "",
          position:
            job?.position || "",
          requirements:
            job?.requirements ||
            "",
        });

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateJob(
        jobId,
        formData
      );

      alert("Job updated successfully");

      navigate(
        "/recruiter/my-jobs"
      );

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to update job"
      );

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow:
            "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Edit Job
        </h2>

        <form
          onSubmit={handleSubmit}
        >
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
            value={
              formData.description
            }
            onChange={handleChange}
            rows="5"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom:
                "15px",
              borderRadius: "6px",
              border:
                "1px solid #ccc",
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
            placeholder="Location"
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
              marginBottom:
                "15px",
              borderRadius: "6px",
              border:
                "1px solid #ccc",
            }}
          >
            <option value="Full-Time">
              Full-Time
            </option>

            <option value="Part-Time">
              Part-Time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Remote">
              Remote
            </option>
          </select>

          <Input
            type="text"
            name="experienceLevel"
            placeholder="Experience Level"
            value={
              formData.experienceLevel
            }
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
            value={
              formData.requirements
            }
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom:
                "20px",
              borderRadius: "6px",
              border:
                "1px solid #ccc",
            }}
          />

          <Button
            type="submit"
            style={{
              width: "100%",
            }}
          >
            Update Job
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;