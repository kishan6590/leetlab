import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import apiClient from "../../service/apiClient";
import { Loader } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import ProblemTable from "../components/ProblemTable";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { problems, isProblemsLoading } = useProblemStore();
  const { getAllProblems } = apiClient;
  const { authUser } = useAuthStore();

  useEffect(() => {
    getAllProblems();
  }, []);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4">
      <div className=" w-full">
        <h1 className="text-5xl font-bold  z-10  broder  text-justify  ">
          <div className="mb-4">
            Hello,<span className="text-[#059669] "> {authUser.name}</span>
          </div>
          <div>
            Welcome to <span className="text-[#059669] ">Pro Coder</span>{" "}
          </div>
        </h1>

        <p className="mt-4 text-4xl  font-semibold text-gray-500 dark:text-gray-400 z-10 ">
          Let's start solving the problems.
        </p>
      </div>

      {problems.length > 0 ? (
        <ProblemTable />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problems found
        </p>
      )}
    </div>
  );
};

export default HomePage;
