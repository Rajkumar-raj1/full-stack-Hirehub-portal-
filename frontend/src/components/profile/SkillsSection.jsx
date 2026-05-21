import { useState } from "react";

const SkillsSection = ({
  skills = [],
  setSkills,
}) => {
  const [skillInput, setSkillInput] =
    useState("");

  const handleAddSkill = () => {
    if (
      skillInput.trim() === ""
    ) {
      return;
    }

    if (
      skills.includes(
        skillInput.trim()
      )
    ) {
      return;
    }

    setSkills([
      ...skills,
      skillInput.trim(),
    ]);

    setSkillInput("");
  };

  const handleRemoveSkill = (
    skillToRemove
  ) => {
    setSkills(
      skills.filter(
        (skill) =>
          skill !== skillToRemove
      )
    );
  };

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "bold",
        }}
      >
        Skills
      </label>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Add skill"
          value={skillInput}
          onChange={(e) =>
            setSkillInput(
              e.target.value
            )
          }
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="button"
          onClick={handleAddSkill}
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            backgroundColor:
              "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {skills.map((skill) => (
          <div
            key={skill}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor:
                "#e0e7ff",
              padding: "8px 12px",
              borderRadius: "20px",
            }}
          >
            <span>{skill}</span>

            <button
              type="button"
              onClick={() =>
                handleRemoveSkill(
                  skill
                )
              }
              style={{
                border: "none",
                background:
                  "transparent",
                color: "#ef4444",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;