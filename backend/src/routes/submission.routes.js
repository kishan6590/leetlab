import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionForProblem, getSubmissionsForProblem } from "../controllers/submission.controllers.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmission);

submissionRoutes.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionsForProblem
);
submissionRoutes.get("/get-submissions-count/:problemId", authMiddleware , getAllTheSubmissionForProblem)
export default submissionRoutes;
