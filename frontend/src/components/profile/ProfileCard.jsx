import { useState } from "react";

import {
  updateUserProfile,
  updateProfilePhoto,
  uploadResume,
} from "../../services/user.service.js";

const EditableRow = ({
  label,
  field,
  text,
  multiline = false,
  editingField,
  value,
  setValue,
  readOnly,
  loading,
  startEdit,
  saveField,
  cancelEdit,
}) => {
  const isEditing =
    editingField === field && !readOnly;

  return (
    <div style={{ marginBottom: "18px" }}>
      <strong>{label}:</strong>

      {isEditing ? (
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              rows="4"
              autoFocus
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                resize: "vertical",
              }}
            />
          ) : (
            <input
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              autoFocus
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
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
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={cancelEdit}
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
              whiteSpace: "pre-wrap",
            }}
          >
            {text || "Not Added"}
          </span>

          {!readOnly && (
            <button
              type="button"
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
};

const ProfileCard = ({
  user,
  setUser,
  readOnly = false,
}) => {
  const [editingField, setEditingField] =
    useState(null);
  const [value, setValue] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const [photoLoading, setPhotoLoading] =
    useState(false);
  const [resumeLoading, setResumeLoading] =
    useState(false);

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.fullName || "User"
  )}&background=2563eb&color=fff&size=150`;

  const updateUserState = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };

  const startEdit = (
    field,
    currentValue
  ) => {
    if (readOnly) return;

    setEditingField(field);
    setValue(currentValue || "");
  };

  const cancelEdit = () => {
    setEditingField(null);
    setValue("");
  };

  const saveField = async () => {
    try {
      setLoading(true);

      const payload = {};

      if (editingField === "skills") {
        payload.skills = value
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      } else {
        payload[editingField] = value;
      }

      const data =
        await updateUserProfile(payload);

      updateUserState(data?.data);

      cancelEdit();
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

  const handleProfilePhotoChange =
    async (e) => {
      if (readOnly) return;

      try {
        setPhotoLoading(true);

        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append(
          "profilePhoto",
          file
        );

        const data =
          await updateProfilePhoto(formData);

        updateUserState(data?.data);

        alert(
          "Profile photo updated successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data?.message ||
            "Profile photo update failed"
        );
      } finally {
        setPhotoLoading(false);
        e.target.value = "";
      }
    };

  const handleResumeChange =
    async (e) => {
      if (readOnly) return;

      try {
        setResumeLoading(true);

        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("resume", file);

        const data =
          await uploadResume(formData);

        updateUserState(data?.data);

        alert("Resume updated successfully");
      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data?.message ||
            "Resume update failed"
        );
      } finally {
        setResumeLoading(false);
        e.target.value = "";
      }
    };

  const commonProps = {
    editingField,
    value,
    setValue,
    readOnly,
    loading,
    startEdit,
    saveField,
    cancelEdit,
  };

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
              defaultAvatar
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
                  photoLoading
                    ? "#9ca3af"
                    : "#2563eb",
                color: "#fff",
                borderRadius: "6px",
                cursor: photoLoading
                  ? "not-allowed"
                  : "pointer",
                display: "inline-block",
              }}
            >
              {photoLoading
                ? "Uploading..."
                : "Update Photo"}

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleProfilePhotoChange
                }
                disabled={photoLoading}
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
            {...commonProps}
          />

          <EditableRow
            label="Email"
            field="email"
            text={user?.email}
            {...commonProps}
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
          {...commonProps}
        />

        <EditableRow
          label="Bio"
          field="bio"
          text={user?.bio}
          multiline
          {...commonProps}
        />

        {user?.role === "recruiter" && (
          <EditableRow
            label="Company"
            field="company"
            text={user?.company}
            {...commonProps}
          />
        )}

        {user?.role === "jobseeker" && (
          <>
            <EditableRow
              label="Skills"
              field="skills"
              text={
                Array.isArray(user?.skills)
                  ? user.skills.join(", ")
                  : user?.skills
              }
              {...commonProps}
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
                      resumeLoading
                        ? "#9ca3af"
                        : "#10b981",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: resumeLoading
                      ? "not-allowed"
                      : "pointer",
                    display:
                      "inline-block",
                  }}
                >
                  {resumeLoading
                    ? "Uploading..."
                    : user?.resume?.url
                    ? "Update Resume"
                    : "Add Resume"}

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={
                      handleResumeChange
                    }
                    disabled={resumeLoading}
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