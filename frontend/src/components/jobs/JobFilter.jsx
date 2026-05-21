const JobFilter = ({
  filters,
  setFilters,
}) => {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        display: "grid",
        gap: "15px",
      }}
    >
      <h2>Filter Jobs</h2>

      {/* Location */}
      <div>
        <label>Location</label>

        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        >
          <option value="">
            All Locations
          </option>

          <option value="Bangalore">
            Bangalore
          </option>

          <option value="Delhi">
            Delhi
          </option>

          <option value="Mumbai">
            Mumbai
          </option>

          <option value="Remote">
            Remote
          </option>
        </select>
      </div>

      {/* Job Type */}
      <div>
        <label>Job Type</label>

        <select
          name="jobType"
          value={filters.jobType}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        >
          <option value="">
            All Types
          </option>

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
      </div>

      {/* Experience */}
      <div>
        <label>Experience Level</label>

        <select
          name="experienceLevel"
          value={filters.experienceLevel}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        >
          <option value="">
            All Levels
          </option>

          <option value="Fresher">
            Fresher
          </option>

          <option value="1 Year">
            1 Year
          </option>

          <option value="2 Years">
            2 Years
          </option>

          <option value="3+ Years">
            3+ Years
          </option>
        </select>
      </div>
    </div>
  );
};

export default JobFilter;