import { UserRole } from "../generated/prisma/index.js";
import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = async function (req, res) {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "You are not allowed to create a problem",
    });
  }
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res
          .status(400)
          .json({ error: `Language ${language} is not supported` });
      }

      // preparing the array of submissions(data) which we have to send to judge0
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      // Send submissions to Judge0 and get tokens for each testcase
      const submissionsResults = await submitBatch(submissions);

      const tokens = submissionsResults.map((res) => res.token);

      // now getting the result of our testcases wheather they get accepted or not
      const results = await pollBatchResults(tokens);

      //checking is there any testcase is wrong
      for (let i = 0; i < results.length; i++) {
        console.log("Result->", results[i]);
        if (results[i].status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }

      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });
      return res.status(201).json({
        success: true,
        message: "Message Created Successfully",
        problem: newProblem,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Creating Problem",
    });
  }
};
export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();
    if (!problems) {
      return res.status(404).json({
        error: "No problem found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      message: "Problems Fetched Successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error While Fetching Problems",
    });
  }
};
export const getProblemByid = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await db.problem.findUnique({ where: { id } });
    if (!problem) {
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }
    return res.status(200).json({
      message: "Problem Fetched Successfully",
      success: true,
      problem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Error While Fetching Problems",
    });
  }
};
export const updateProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  const { id } = res.params;
  if (req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({
      error: "You are not allowed to update problem",
      success: false,
    });
  }
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
          success: false,
        });
      }
    }
    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));
    const submissionsResults = await submitBatch(submissions);
    const tokens = submissionsResults.map((res) => res.token);

    const results = await pollBatchResults(tokens);
    for (let i = 0; i < results.length; i++) {
      console.log("updatedREslt -", results);
      if (results[i].status.id !== 3) {
        return res.status(400).json({
          error: `Testcase ${i + 1} failed for language ${language} `,
        });
      }
    }
    const updateProblem = await db.problem.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });
    return res.status(201).json({
      message: "Problem updated successfully",
      success: true,
      problem: updateProblem,
    });
  } catch (error) {
    return res.status(500).json({
      error: `Error while updating the problem`,
    });
  }
};
export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await db.problem.findUnique({ where: { id } });

    if (!problem) {
      return res.status(400).json({
        error: "Problem not found",
        success: false,
      });
    }
    await db.problem.delete({ where: { id } });

    return res.status(200).json({
      message: "Problem deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error while deleting problem",
      success: false,
    });
  }
};
export const getAllProblemsSolvedByUser = async (req, res) => {};
