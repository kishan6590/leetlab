import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async function (req, res) {
  console.log("req.body-", req.body);
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const userId = req.user.id;
  try {
    //validate test cases
    if (
      !Array.isArray(stdin) ||
      stdin.length == 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid or Missing test cases",
      });
    }

    // prepare each test cases for judge0 batch submissions
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));
    //send  batch of submissions to judge0
    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);
    const results = await pollBatchResults(tokens);
    console.log("results-->");
    console.log(results);
    return res.status(200).json({
      message: "Code Executed!",
    });
  } catch (error) {}
};
