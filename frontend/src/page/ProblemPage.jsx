import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  SquareCode,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import apiClient from "../../service/apiClient.js";
import { useProblemStore } from "../store/useProblemStore";
// import { getLanguageId } from "../lib/lang";
import { useExecutionStore } from "../store/useExecutionStore";
import { getLanguageId } from "../lib/lang.js";
import SubmissionResults from "../components/Submission";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import SubmissionsList from "../components/SubmissionList.jsx";
import Navbar from "../components/Navbar.jsx";

// import SubmissionsList from "../components/SubmissionList";
function ProblemPage() {
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    submissionCount,
  } = useSubmissionStore();
  const { id } = useParams();
  const {
    getProblemById,
    executeCode,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
  } = apiClient;
  const { problem, isProblemLoading } = useProblemStore();
  const [code, setCode] = useState("");

  const [activeTab, setActiveTab] = useState("description");

  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { isExecuting, submission } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);

    // getSubmissionCountForProblem(id);
    console.log("working");
  }, [id, submission]);

  useEffect(() => {
    console.log("problem----", problem);
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage]);
      setTestCases(
        problem?.testcases.map((tc) => ({
          input: tc.input,
          output: tc.output,
        }))
      );
    }
  }, [problem, selectedLanguage]);
  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  console.log("submission", submission);
  // let submissionCount = 9;
  function handleLanguageChange(e) {
    const lang = e.target.value;

    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none ">
            <p className="text-lg mb-6">{problem?.description}</p>

            {problem?.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem?.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                    >
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Input:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.output}
                        </span>
                      </div>
                      {example?.explanation && (
                        <div>
                          <div className="text-emerald-300 mb-2 text-base font-semibold">
                            Explanation:
                          </div>
                          <p className="text-base-content/70 text-lg font-sem">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {problem?.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-6 rounded-xl mb-6">
                  <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);

      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log(`Error executing code`, error);
    }
  };
  return (
    <div
      className="min-h-screen max-w-7xl w-full border-2 border-gray-200/10 mx-auto"
      style={{
        background:
          "linear-gradient(to bottom right,#09090b 5% ,#171717 40%,#1f2937)",

        // backgroundRepeat: "no-repeat"
      }}
    >
      <Navbar />
      <nav className="shadow-lg shadow-stone-800  border-b-1 p-4 mx-5 flex justify-between items-center   text-4xl ">
        <div className="flex items-center gap-5">
          <SquareCode className="w-10 h-10" />
          <h1 className="font-raleway font-semibold">{problem?.title}</h1>
        </div>
        {/* <div className="flex-1 gap-2"> */}
        {/* <Link to={"/"} className="flex items-center gap-2 text-primary">
            <Home className="w-6 h-6" />
            <ChevronRight className="w-4 h-4" />
          </Link> */}
        {/*  
          <div className="mt-2">
            {/* <h1 className="text-xl font-bold">{problem.title}</h1> */}
        {/* <div className="flex items-center gap-2 text-sm text-base-content/70 mt-5"> */}
        {/* <Clock className="w-4 h-4" /> */}
        {/* <span>
                Updated{" "}
                {new Date(problem.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span> */}
        {/* <span className="text-base-content/30">•</span> */}
        {/* <Users className="w-4 h-4" /> */}
        {/* <span>{submissionCount} Submissions</span> */}
        {/* <span className="text-base-content/30">•</span> */}
        {/* <ThumbsUp className="w-4 h-4" /> */}
        {/* <span>95% Success Rate</span> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}

        <div className="flex-none gap-4 ">
          <button
            className={`btn btn-ghost btn-circle ${
              isBookmarked ? "text-primary" : ""
            }`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Share2 className="w-5 h-5" />
          </button>
          <select
            className="select select-bordered select-primary w-40"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem?.codeSnippets || []).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <div
        className=" mx-4 py-4  "
        style={{
          background:
            "linear-gradient(to bottom right,#09090b 5% ,#171717 40%,#1f2937)",
        }}
      >
        <div className=" grid grid-cols-1 lg:grid-cols-2  gap-6  ">
          <div
            className="card bg-base-100 border-l border-[#1f2937] shadow-xl   max-h-[650px]  relative "
            style={{
              background:
                "linear-gradient(to bottom right,#09090b 5% ,#171717 40%,#1f2937)",
            }}
          >
            <div className="card-body p-0 ">
              <div className="tabs tabs-bordered   inset-x-0 top-0">
                <button
                  className={`tab gap-2 ${
                    activeTab === "description" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "submissions" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "discussion" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "hints" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>

              <div className="p-6   max-h-[600px]  overflow-y-auto  ">
                {renderTabContent()}{" "}
              </div>
            </div>
          </div>
          <div className="card bg-base-100  shadow-xl ">
            <div className="card-body p-0">
              <div
                className="tabs tabs-border"
                style={{
                  background:
                    "linear-gradient(to bottom right,#09090b 5% ,#171717 40%,#1f2937)",
                }}
              >
                <button className="tab tab-active gap-2">
                  <Terminal className="w-4 h-4" /> Code Editor
                </button>
              </div>
              <div className="h-[600px] w-full">
                <Editor
                  height={"100%"}
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontsize: 22,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="p-4 border-t border-base-300 bg-base-200 mx-4 "
        style={{
          background:
            "linear-gradient(to bottom right,#09090b 5% ,#171717 40%,#1f2937)",
        }}
      >
        <div className="flex justify-between items-center">
          <button
            className={`btn bg-[#9a3412]/60 gap-2 ${
              isExecuting ? "loading" : ""
            }`}
            onClick={handleRunCode}
            disabled={isExecuting}
          >
            {!isExecuting && <Play className="w-4 h-4" />}
            Run Code
          </button>
          <button className="btn btn-success gap-2">Submit Solution</button>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl mt-6 mx-4">
        <div
          className="card-body rounded-lg"
          style={{
            background:
              "linear-gradient(to bottom right,#09090b 5% ,#171717 40%,#1f2937)",
          }}
        >
          {submission ? (
            <SubmissionResults submission={submission.submission} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6 ">
                <h3 className="text-xl font-bold">Test Cases</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="table  w-full">
                  <thead>
                    <tr className="bg-[#475569]/20 ">
                      <th>Input</th>
                      <th>Expected Output</th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      background:
                        "linear-gradient(to bottom right,#09090b/50 5% ,#171717/50 40%,#1f2937/50)",
                    }}
                  >
                    {testcases.map((testCase, index) => (
                      <tr key={index} className="bg-[#475569]/20 ">
                        <td className="font-mono ">{testCase.input}</td>
                        <td className="font-mono  ">{testCase.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      īīī
    </div>
  );
}

export default ProblemPage;
