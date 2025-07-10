import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import problemsRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello guys welcome to leetlab🐦‍🔥");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemsRoutes);
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
