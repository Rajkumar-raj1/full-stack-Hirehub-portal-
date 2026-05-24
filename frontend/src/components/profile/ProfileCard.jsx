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
  setEditingField,
}) => {
  return (
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
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditingField(null);
                setValue("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <span style={{ marginLeft: "8px" }}>
            {text || "Not Added"}
          </span>

          {!readOnly && (
            <button
              onClick={() =>
                startEdit(field, text)
              }
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
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

  const startEdit = (
    field,
    currentValue
  ) => {
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
          .map((s) => s.trim())
          .filter(Boolean);
      } else {
        payload[editingField] = value;
      }

      const data =
        await updateUserProfile(
          payload
        );

      setUser(data?.data);

      localStorage.setItem(
        "user",
        JSON.stringify(data?.data)
      );

      setEditingField(null);
      setValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePhotoChange =
    async (e) => {
      const file =
        e.target.files[0];
      if (!file) return;

      const formData =
        new FormData();
      formData.append(
        "profilePhoto",
        file
      );

      const data =
        await updateProfilePhoto(
          formData
        );
      setUser(data?.data);
    };

  const handleResumeChange =
    async (e) => {
      const file =
        e.target.files[0];
      if (!file) return;

      const formData =
        new FormData();
      formData.append(
        "resume",
        file
      );

      const data =
        await uploadResume(
          formData
        );
      setUser(data?.data);
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
              backgroundColor: "#2563eb",
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
              onChange={handleProfilePhotoChange}
              style={{ display: "none" }}
            />
          </label>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <EditableRow
          label="Name"
          field="fullName"
          text={user?.fullName}
          editingField={editingField}
          value={value}
          setValue={setValue}
          readOnly={readOnly}
          loading={loading}
          startEdit={startEdit}
          saveField={saveField}
          setEditingField={setEditingField}
        />

        <EditableRow
          label="Email"
          field="email"
          text={user?.email}
          editingField={editingField}
          value={value}
          setValue={setValue}
          readOnly={readOnly}
          loading={loading}
          startEdit={startEdit}
          saveField={saveField}
          setEditingField={setEditingField}
        />

        <p>
          <strong>Role:</strong>{" "}
          <span
            style={{
              color: "#2563eb",
              textTransform: "capitalize",
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
        editingField={editingField}
        value={value}
        setValue={setValue}
        readOnly={readOnly}
        loading={loading}
        startEdit={startEdit}
        saveField={saveField}
        setEditingField={setEditingField}
      />

      <EditableRow
        label="Bio"
        field="bio"
        text={user?.bio}
        multiline
        editingField={editingField}
        value={value}
        setValue={setValue}
        readOnly={readOnly}
        loading={loading}
        startEdit={startEdit}
        saveField={saveField}
        setEditingField={setEditingField}
      />

      {user?.role === "recruiter" && (
        <EditableRow
          label="Company"
          field="company"
          text={user?.company}
          editingField={editingField}
          value={value}
          setValue={setValue}
          readOnly={readOnly}
          loading={loading}
          startEdit={startEdit}
          saveField={saveField}
          setEditingField={setEditingField}
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
            editingField={editingField}
            value={value}
            setValue={setValue}
            readOnly={readOnly}
            loading={loading}
            startEdit={startEdit}
            saveField={saveField}
            setEditingField={setEditingField}
          />

          <div style={{ marginTop: "20px" }}>
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
                  padding: "8px 12px",
                  backgroundColor: "#10b981",
                  color: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                {user?.resume?.url
                  ? "Update Resume"
                  : "Add Resume"}

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  style={{ display: "none" }}
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