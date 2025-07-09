import {
  getlanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";
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

    //  Poll judge0 for results of all submitted test cases
    const results = await pollBatchResults(tokens);
    console.log("results-->");
    console.log(results);
    //Analyze test cases results

    let allPassed = true;

    const detailedResult = results.map((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i]?.trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;
      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
      // console.log(`Testcase #${i + 1}`);
      // console.log(`Input ${stdin[i]}`);
      // console.log(`Expected Output for the testcase${expected_output}`);
      // console.log(`Actual Output ${stdout}`);
      // console.log(`Matched : ${passed}`);
    });
    console.log("detailer Output -", detailedResult);
    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        langugae: getlanguageName(language_id),
        stdin: stdin.join("\n"),

        stdout: JSON.stringify(detailedResult.map((r) => r.stdout)),
        stderr: detailedResult.some((r) => r.stderr)
          ? JSON.stringify(detailedResult.map((r) => r.stderr))
          : null,
        compileOutput: detailedResult.some((r) => r.compile_output)
          ? JSON.stringify(detailedResult.map((r) => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detailedResult.some((r) => r.memory)
          ? JSON.stringify(detailedResult.map((r) => r.memory))
          : null,
        time: detailedResult.some((r) => r.time)
          ? JSON.stringify(detailedResult.map((r) => r.time))
          : null,
      },
    });

    // if all test cases is passed then savaing to the problemsolved only first time
    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }
    // save individual test case result using detailedResult

    const testCaseResults = detailedResult.map((result) => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));
    await db.testCaseResult.createMany({
      data: testCaseResults,
    });
    const submissionWithTestCase = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });
    return res.status(200).json({
      message: "Code Executed!",
      success: true,
      submission: submissionWithTestCase,
    });
  } catch (error) {
    console.error("Error executing code:", error.message);
    res.status(500).json({
      error: "Failed to execute code",
    });
  }
};
