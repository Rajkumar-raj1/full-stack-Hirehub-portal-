import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true
    },

    salary: {
      type: Number,
      required: true
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote"],
      required: true
    },

   experienceLevel: {
  type: Number,
  required: true,
  min: 0,
  default: 0,
},

    skillsRequired: {
      type: [String],
      default: []
    },

    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application"
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Job = mongoose.model("Job", jobSchema);