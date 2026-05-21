import { useState } from "react";

import Button from "../common/Button.jsx";

const ResumeUpload = ({
  onFileSelect,
}) => {
  const [fileName, setFileName] =
    useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      onFileSelect(file);
    }
  };

  return (
    <div
      style={{
        marginTop: "15px",
      }}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
      />

      {fileName && (
        <p
          style={{
            marginTop: "10px",
          }}
        >
          Selected File: {fileName}
        </p>
      )}

      <div
        style={{
          marginTop: "15px",
        }}
      >
        <Button type="button">
          Upload Resume
        </Button>
      </div>
    </div>
  );
};

export default ResumeUpload;