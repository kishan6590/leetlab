import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import {createProblem,deleteProblem,getAllProblems,getAllProblemsSolvedByUser,getProblemByid,updateProblem,} from "../controllers/Problem.controllers.js";

const problemsRoutes = express.Router();

problemsRoutes.post(
  "/create-problem",
  authMiddleware,
  checkAdmin,
  createProblem
);
problemsRoutes.get("/get-all-problems", authMiddleware, getAllProblems);
problemsRoutes.get("/get-problem/:id", authMiddleware, getProblemByid);
problemsRoutes.put("/update-problem/:id",authMiddleware,checkAdmin,updateProblem);
problemsRoutes.delete("/delete-problem/:id",authMiddleware,checkAdmin,deleteProblem);
problemsRoutes.get("/get-solved-problems" ,authMiddleware,getAllProblemsSolvedByUser);

export default problemsRoutes;
