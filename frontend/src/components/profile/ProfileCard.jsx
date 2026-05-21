import { useState } from "react";

import {
  updateUserProfile,
  updateProfilePhoto,
  uploadResume,
} from "../../services/user.service.js";

const ProfileCard = ({
  user,
  setUser,
  readOnly = false,
}) => {
  const [editingField, setEditingField] = useState(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const startEdit = (field, currentValue) => {
    if (readOnly) return;
    setEditingField(field);
    setValue(currentValue || "");
  };

  const saveField = async () => {
    try {
      setLoading(true);

      let payload = {};

      if (editingField === "skills") {
        payload.skills = value
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "");
      } else {
        payload[editingField] = value;
      }

      const data = await updateUserProfile(payload);

      setUser(data?.data);

      localStorage.setItem(
        "user",
        JSON.stringify(data?.data)
      );

      setEditingField(null);
      setValue("");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePhotoChange = async (e) => {
    if (readOnly) return;

    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profilePhoto", file);

      const data = await updateProfilePhoto(formData);

      setUser(data?.data);

      localStorage.setItem(
        "user",
        JSON.stringify(data?.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleResumeChange = async (e) => {
    if (readOnly) return;

    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("resume", file);

      const data = await uploadResume(formData);

      setUser(data?.data);

      localStorage.setItem(
        "user",
        JSON.stringify(data?.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const EditableRow = ({
    label,
    field,
    text,
    multiline = false,
  }) => (
    <div style={{ marginBottom: "18px" }}>
      <strong>{label}:</strong>

      {editingField === field && !readOnly ? (
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              rows="3"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          ) : (
            <input
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          )}

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              onClick={saveField}
              disabled={loading}
              style={{
                padding: "8px 14px",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditingField(null);
                setValue("");
              }}
              style={{
                padding: "8px 14px",
                backgroundColor: "#e5e7eb",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <span
            style={{
              marginLeft: "8px",
              wordBreak: "break-word",
            }}
          >
            {text || "Not Added"}
          </span>

          {!readOnly && (
            <button
              onClick={() =>
                startEdit(field, text)
              }
              style={{
                marginLeft: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#2563eb",
                fontSize: "16px",
              }}
            >
              ✏️
            </button>
          )}
        </>
      )}
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow:
          "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={
              user?.profilePhoto?.url ||
              "https://via.placeholder.com/150"
            }
            alt="profile"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #2563eb",
              marginBottom: "10px",
            }}
          />

          {!readOnly && (
            <label
              style={{
                padding: "8px 12px",
                backgroundColor:
                  "#2563eb",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              Update Photo
              <input
                type="file"
                accept="image/*"
                onChange={
                  handleProfilePhotoChange
                }
                style={{
                  display: "none",
                }}
              />
            </label>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <EditableRow
            label="Name"
            field="fullName"
            text={user?.fullName}
          />

          <EditableRow
            label="Email"
            field="email"
            text={user?.email}
          />

          <p>
            <strong>Role:</strong>{" "}
            <span
              style={{
                color: "#2563eb",
                textTransform:
                  "capitalize",
              }}
            >
              {user?.role}
            </span>
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "20px",
        }}
      >
        <EditableRow
          label="Phone"
          field="phoneNumber"
          text={user?.phoneNumber}
        />

        <EditableRow
          label="Bio"
          field="bio"
          text={user?.bio}
          multiline
        />

        {user?.role === "recruiter" && (
          <EditableRow
            label="Company"
            field="company"
            text={user?.company}
          />
        )}

        {user?.role === "jobseeker" && (
          <>
            <EditableRow
              label="Skills"
              field="skills"
              text={
                Array.isArray(
                  user?.skills
                )
                  ? user.skills.join(", ")
                  : user?.skills
              }
            />

            <div
              style={{
                marginTop: "20px",
              }}
            >
              <strong>Resume:</strong>

              {user?.resume?.url ? (
                <a
                  href={user.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "10px",
                    color: "#2563eb",
                    fontWeight: "bold",
                  }}
                >
                  View Resume
                </a>
              ) : (
                <span> Not Added</span>
              )}

              {!readOnly && (
                <label
                  style={{
                    marginLeft: "15px",
                    padding:
                      "8px 12px",
                    backgroundColor:
                      "#10b981",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display:
                      "inline-block",
                  }}
                >
                  {user?.resume?.url
                    ? "Update Resume"
                    : "Add Resume"}

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={
                      handleResumeChange
                    }
                    style={{
                      display: "none",
                    }}
                  />
                </label>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;