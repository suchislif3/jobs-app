import Job from "../models/Job.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest.js";
import NotFoundError from "../errors/notFound.js";

export const getAllJobs = async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  const jobs = await Job.find({ createdBy: req.user._id }).sort({
    applicationDate: -1,
    createdAt: -1,
  });
  const user = await User.findOne({ _id: userId }, { jobsOrder: 1 });
  if (user.jobsOrder) {
    jobs.sort((a, b) => {
      return user.jobsOrder.indexOf(a._id) - user.jobsOrder.indexOf(b._id);
    });
  }
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const getJob = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req, res) => {
  const {
    body: { company, position, applicationDate },
    user: { _id: userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "" || applicationDate === "") {
    throw new BadRequestError(
      "Company, position and application date fields cannot be empty"
    );
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};

export const saveOrder = async (req, res) => {
  const {
    body: newOrder,
    user: { _id: userId },
  } = req;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { jobsOrder: newOrder },
    { new: true }
  );
  if (!user) {
    throw new NotFoundError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ success: true });
};
