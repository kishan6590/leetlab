import { db } from "../libs/db";

export const getAllSubmission = async function (req, res) {
  try {
    const userId = req.user.id;
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
export const getSubmissionsForProblem = async function (req, res) {
  try {
    const userId = req.userId;
    const problemId = req.params.problemId;
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Submission fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

export const getAllTheSubmissionForProblem = async function (req, res) {
  try {
    const problemId = req.params.problemId;

    const submission = await db.submission.count({
      where: {
        problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions Fetched Successfully",
      count: submission,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
