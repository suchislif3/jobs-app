import mongoose from "mongoose";

// define schema
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxLength: [50, "Company can be a maximum of 50 characters long"],
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxLength: [100, "Position can be a maximum of 100 characters long"],
    },
    contactPerson: {
      type: String,
      maxLength: [30, "Contact person can be a maximum of 30 characters long"],
    },
    location: {
      type: String,
      maxLength: [30, "Location can be a maximum of 30 characters long"],
    },
    applicationDate: {
      type: Date,
      required: [true, "Please provide application date"],
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    comment: {
      type: String,
      maxLength: [300, "Comment can be a maximum of 300 characters long"],
    },
    url: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

// compile model
const Job = mongoose.model("Job", JobSchema);

export default Job;
