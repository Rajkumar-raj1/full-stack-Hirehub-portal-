import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    applicant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    resume: {
      url: {
        type: String
      },
      public_id: {
        type: String
      }
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export const Application = mongoose.model(
  "Application",
  applicationSchema
);