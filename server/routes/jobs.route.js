import express from "express";

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  saveOrder,
} from "../controllers/jobsController.js";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/saveorder").patch(saveOrder);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

export default router;
