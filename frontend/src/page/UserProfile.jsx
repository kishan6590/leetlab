import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Loader, LoaderPinwheel, Mail } from "lucide-react";
import apiClient from "../../service/apiClient";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useProblemStore } from "../store/useProblemStore";
import { set } from "zod";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
function UserProfile() {
  const { getSolvedProblemByUser, getAllProblems } = apiClient;
  const {
    isSolvedProblemsLoading,
    solvedProblems,
    isProblemsLoading,
    problems,
  } = useProblemStore();
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    getSolvedProblemByUser();
  }, []);
  useEffect(() => {
    let numberOfSolvedProblems = solvedProblems.length;
    console.log("numberOfSolvedProblems", numberOfSolvedProblems);
    let totalProblems = problems.length;
    console.log("totalProblems", totalProblems);
    let percentage = (numberOfSolvedProblems / totalProblems) * 100;
    console.log("Percentage of solved problems:", percentage);
    setPercentage(percentage);
  }, [solvedProblems, problems]);

  let today = new Date();
  let startDate = new Date(today.getFullYear(), 0, 1);

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="border grid grid-cols-2  p-5 gap-4">
        <div className="border border-amber-200  rounded-xl items-center gap-4 px-10 py-7 flex  ">
          <div className=" border border-black w-[100px] h-[100px] rounded-full bg-emerald-200 text-emerald-900  flex justify-center items-center text-6xl">
            K
          </div>
          <div className=" flex flex-col justify-center gap-1">
            <h2 className="text-4xl text-[#fbbf24] font-bold"> Kishan</h2>
            <div className="text-[#d4d4d8]  selection:bg-[#ffffff]">
              <p className=" flex gap-1 align-center ">
                <Mail className="w-4" />
                kishan@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="border border-amber-200    flex  items-center ">
          <div className="border flex flex-col justify-center items-center gap-4 w-full rounded-2xl">
            <div className="flex justify-center items-center gap-4 border-b w-full py-2 ">
              <LoaderPinwheel />
              <h2 className="text-2xl">Progress Overview</h2>
            </div>
            <div className=" relative w-[150px] h-[150px] mb-4">
              <CircularProgressbar value={90} />
              <div className="absolute  inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold">
                  {solvedProblems.length}
                </span>
                <div className="text-lg  space-x-2 ">
                  <span className="">of</span>
                  <span className="">{problems.length}</span>
                </div>
                <span className="">Solved</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border  border-amber-200 col-start-1 col-end-3 ">
          <div className="">
            <div className="border w-full  ">
              <CalendarHeatmap
                // startDate={new Date("2016-01-01")}
                startDate={startDate}
                // endDate={new Date("2016-12-01")}
                endDate={today}
                values={[{ date: "2016-01-02", count: 1 }]}
                classForValue={(value) => {
                  if (!value || value.count === 0) {
                    return "color-empty";
                  }
                  return "color-filled";
                }}
              />
            </div>
          </div>
        </div>
        <div className="border border-amber-200 col-start-1 col-end-3">4</div>
        <div className="border border-amber-200 col-start-1 col-end-3">5</div>
      </div>
    </div>
  );
}

export default UserProfile;
