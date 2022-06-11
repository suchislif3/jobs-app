import mongoose from "mongoose";

// define schema
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxLength: 100,
    },
    contactPerson: {
      type: String,
      maxLength: 30,
    },
    location: {
      type: String,
      maxLength: 30,
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
      maxLength: 300,
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
