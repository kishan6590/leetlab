import db from "../libs/db.js";
import { getJudge0LanguageId } from "../libs/judge0.lib.js";

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

      const tokens = submissionsResults.map((res) => res.token); //extracted tokens

      // now getting the result of our testcases wheather they get accepted or not
      const results = await pollBatchResults(tokens);

      //checking is there any testcase is wrong
      for (let i = 0; i < results.length; i++) {
        if (results[i].status.id == 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }

      //save the problem to the db
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
      return res.status(201).json(newProblem);
    }
  } catch (error) {}
};
export const getAllProblems = async (req, res) => {};
export const getProblemByid = async (req, res) => {};
export const updateProblem = async (req, res) => {};
export const deleteProblem = async (req, res) => {};
export const getAllProblemsSolvedByUser = async (req, res) => {};
