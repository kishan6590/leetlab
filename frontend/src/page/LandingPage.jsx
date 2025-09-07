import {
  ArrowRight,
  ArrowUpRight,
  CircleUserRound,
  Code,
  Copyright,
  Github,
  Linkedin,
  Mail,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

function LandingPage() {
  return (
    <div>
      <motion.div
        className=" mx-2 space-y-10  py-7   "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          backgroundImage:
            " radial-gradient(circle, white 0.3px, transparent 0.5px)",
          backgroundSize: " 20px 20px ",
        }}
      >
        <h2 className=" text-8xl mt-12 translate-x-[-8px] w-[70%] text-center leading-28 tracking-tight  font-semibold    ">
          <span className="bg-gradient-to-b from-[#e4e4e7] to-[#525252] bg-clip-text text-transparent ">
            Become a
            <span className=" ml-5 bg-gradient-to-b from-cyan-300 to-emerald-400 font-bold bg-clip-text text-transparent">
              ProCoder
            </span>
          </span>
          <span className="bg-gradient-to-b from-[#e4e4e7]  bg-clip-text text-transparent ">
            {" "}
            <span className="text-[] ">Solve</span>.
            <span className="text-[]">Learn</span>.
            <span className="text-[]">Repeat</span>
          </span>
        </h2>

        <p className="text-[#737373]  max-w-3xl  text-center  mt-6 text-lg">
          Practice coding problems, compete in contests, and prepare for
          technical interviews with our comprehensive platform trusted by top
          tech companies.
        </p>

        <button
          className="    bg-gradient-to-b   from-cyan-300 to-emerald-400 text-black pl-4 pr-3 py-3 flex justify-center gap-1 text-2xl   rounded-full  items-center mt-8
         font-semibold  hover:shadow-sm  hover:shadow-cyan-500 transition-all duration-300 hover:scale-105"
        >
          Start Practicing <ArrowUpRight />
        </button>
      </motion.div>
      <motion.div
        className=" w-[90%] mx-auto  flex justify-around text-3xl  py-6 mt-10  "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center font-semibold ">
          20+
          <span className="text-xl">Problems</span>
        </div>
        <div className="flex flex-col items-center font-semibold">
          20+
          <span className="text-xl">Users</span>
        </div>
        <div className="flex flex-col items-center font-semibold">
          5+
          <span className="text-xl">Companies </span>
        </div>
        <div className="flex flex-col items-center font-semibold">
          90+
          <span className="text-xl">Success Rate</span>
        </div>
      </motion.div>

      <div className=" w-full flex items-center justify-center text-5xl  font-semibold mt-12  py-7 ">
        <h2>
          Everything You need to
          <span className="bg-clip-text bg-gradient-to-b from-cyan-300 to-emerald-400 text-transparent ml-4 ">
            Succeed
          </span>
        </h2>
      </div>
      <motion.div
        className="flex  mt-12 justify-center flex-wrap  gap-6 px-4 pt-4 "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex   w-[30%] flex-col items-start justify-center p-4 gap-4 bg-[#0a0a0a]  group rounded-2xl shadow-[0_0_0_1px] shadow-[#262626] hover:translate-y-[-0.3rem] transition-all duration-300">
          <span className="bg-blue-400 p-2 rounded-2xl ">
            <Code className="w-10 h-10  group-hover:scale-110 transition-all duration-300" />
          </span>

          <h2 className="text-2xl  group-hover:text-blue-400">
            2000+ Coding Problems
          </h2>

          <p className=" text-[#e5e7eb]">
            From easy to hard, covering all major algorithms and data structures
            with detailed solutions.
          </p>
        </div>

        <div className="flex   w-[30%] flex-col items-start justify-center p-4 gap-4 bg-[#0a0a0a]  group rounded-2xl shadow-[0_0_0_1px] shadow-[#262626] hover:translate-y-[-0.3rem] transition-all duration-300">
          <span className="bg-blue-400 p-2 rounded-2xl ">
            <Code className="w-10 h-10  group-hover:scale-110 transition-all duration-300" />
          </span>

          <h2 className="text-2xl  group-hover:text-blue-400">
            2000+ Coding Problems
          </h2>

          <p className=" text-[#e5e7eb]">
            From easy to hard, covering all major algorithms and data structures
            with detailed solutions.
          </p>
        </div>

        <div className="flex   w-[30%] flex-col items-start justify-center p-4 gap-4 bg-[#0a0a0a]  group rounded-2xl shadow-[0_0_0_1px] shadow-[#262626] hover:translate-y-[-0.3rem] transition-all duration-300">
          <span className="bg-blue-400 p-2 rounded-2xl ">
            <Code className="w-10 h-10  group-hover:scale-110 transition-all duration-300" />
          </span>

          <h2 className="text-2xl  group-hover:text-blue-400">
            2000+ Coding Problems
          </h2>

          <p className=" text-[#e5e7eb]">
            From easy to hard, covering all major algorithms and data structures
            with detailed solutions.
          </p>
        </div>
      </motion.div>

      <div className=" flex flex-col justify-center  w-full  gap-4 ">
        <h2 className="m-auto text-4xl font-semibold  mt-20 ">
          Trusted by <span className="text-blue-500"> Top Developers</span>
        </h2>
        <p className="m-auto  w-1/2 text-center text-[#d4d4d4]/79 text-[17px] mt-4">
          Join thousands of developers who have successfully landed their dream
          jobs at top tech companies using our platform.
        </p>
        <motion.div
          className="  flex flex-wrap gap-5 justify-center  pt-4  mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className=" w-[30%]  bg-[#0a0a0a] p-4 shadow-[0_0_0_1px] shadow-[#262626] space-y-4 rounded-md   ">
            <span className="flex  gap-1">
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
            </span>

            <p>
              "ProCoder helped me prepare for my Google interview. The mock
              interviews were incredibly realistic and the feedback was
              invaluable."
            </p>
            <p className="flex flex-col  ">
              <span className="flex gap-2 ">
                <CircleUserRound className="text-blue-500" /> <p>Jhon Doe</p>
              </span>
              <p className=" text-[#d4d4d4]/79">Software Engineer at Google</p>
            </p>
          </div>
          <div className=" w-[30%]  bg-[#0a0a0a] p-4 shadow-[0_0_0_1px] shadow-[#262626] space-y-4 rounded-md  ">
            <span className="flex  gap-1">
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
            </span>

            <p>
              "ProCoder helped me prepare for my Google interview. The mock
              interviews were incredibly realistic and the feedback was
              invaluable."
            </p>
            <p className="flex flex-col  ">
              <span className="flex gap-2 ">
                <CircleUserRound className="text-blue-500" /> <p>Jhon Doe</p>
              </span>
              <p className=" text-[#d4d4d4]/79">Software Engineer at Google</p>
            </p>
          </div>
          <div className=" w-[30%]  bg-[#0a0a0a] p-4 shadow-[0_0_0_1px] shadow-[#262626] space-y-4 rounded-md  ">
            <span className="flex  gap-1">
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
            </span>

            <p>
              "ProCoder helped me prepare for my Google interview. The mock
              interviews were incredibly realistic and the feedback was
              invaluable."
            </p>
            <p className="flex flex-col  ">
              <span className="flex gap-2 ">
                <CircleUserRound className="text-blue-500" /> <p>Jhon Doe</p>
              </span>
              <p className=" text-[#d4d4d4]/79">Software Engineer at Google</p>
            </p>
          </div>
          <div className=" w-[30%]  bg-[#0a0a0a] p-4 shadow-[0_0_0_1px] shadow-[#262626] space-y-4 rounded-md  ">
            <span className="flex  gap-1">
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
            </span>

            <p>
              "ProCoder helped me prepare for my Google interview. The mock
              interviews were incredibly realistic and the feedback was
              invaluable."
            </p>
            <p className="flex flex-col  ">
              <span className="flex gap-2 ">
                <CircleUserRound className="text-blue-500" /> <p>Jhon Doe</p>
              </span>
              <p className=" text-[#d4d4d4]/79">Software Engineer at Google</p>
            </p>
          </div>
          <div className=" w-[30%]  bg-[#0a0a0a] p-4 shadow-[0_0_0_1px] shadow-[#262626] space-y-4 rounded-md  ">
            <span className="flex  gap-1">
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
            </span>

            <p>
              " ProCoder helped me prepare for my Google interview. The mock
              interviews were incredibly realistic and the feedback was
              invaluable."
            </p>
            <p className="flex flex-col  ">
              <span className="flex gap-2 ">
                <CircleUserRound className="text-blue-500" /> <p>Jhon Doe</p>
              </span>
              <p className=" text-[#d4d4d4]/79">Software Engineer at Google</p>
            </p>
          </div>
          <div className=" w-[30%]  bg-[#0a0a0a] p-4 shadow-[0_0_0_1px] shadow-[#262626] space-y-4 rounded-md  ">
            <span className="flex  gap-1">
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
              <Star fill="yellow" strokeWidth={0} />
            </span>

            <p>
              "ProCoder helped me prepare for my Google interview. The mock
              interviews were incredibly realistic and the feedback was
              invaluable."
            </p>
            <p className="flex flex-col  ">
              <span className="flex gap-2 ">
                <CircleUserRound className="text-blue-500" /> <p>Jhon Doe</p>
              </span>
              <p className=" text-[#d4d4d4]/79">Software Engineer at Google</p>
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        className=" flex flex-col items-center mt-10 "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className=" text-4xl font-bold  p-3  mt-10 ">
          Ready to <span className="text-blue-500">Transform</span> Your Career?
        </div>
        <p className="w-1/2 text-center   text-[#d4d4d4]/79 text-[17px]  mt-6">
          Join so many developers who are already mastering their coding skills
          and landing jobs at top teach comapanies.
          <button
            className="bg-gradient-to-b  mx-auto from-cyan-300 to-emerald-400 text-black pl-4 pr-3 py-3 flex justify-center gap-1 text-2xl   rounded-full  items-center mt-11
         font-semibold  hover:shadow-sm  hover:shadow-cyan-500 transition-all duration-300 hover:scale-105"
          >
            Start Practicing <ArrowRight />
          </button>
        </p>
        <div className=" w-full flex  justify-center py-10 gap-5 flex-wrap  mt-8      ">
          <div className="  flex flex-col items-center backdrop-blur-sm  bg-[#0a0a0a]   gap-2  p-3 shadow-[0_0_0_1px] shadow-[#262626] rounded-md">
            <span className=" w-14 h-14  flex justify-center items-center rounded-full bg-[#1e1b4b]/70 ">
              <Code className="  text-blue-500 z-10" />
            </span>
            <p className="">Free to Start</p>
            <p className="  w-10/12 text-center   text-[#d4d4d4]/79">
              Begin with hundreds of free problems
            </p>
          </div>
          <div className="  flex flex-col items-center backdrop-blur-sm bg-[#0a0a0a]   gap-2  p-3 shadow-[0_0_0_1px] shadow-[#262626] rounded-md ">
            <span className=" w-14 h-14  flex justify-center items-center rounded-full bg-[#1e1b4b]/70 ">
              <Code className="  text-blue-500 z-10" />
            </span>
            <p className="">Free to Start</p>
            <p className="  w-10/12 text-center   text-[#d4d4d4]/79">
              Begin with hundreds of free problems
            </p>
          </div>
          <div className="  flex flex-col items-center backdrop-blur-sm bg-[#0a0a0a]   gap-2  p-3 shadow-[0_0_0_1px] shadow-[#262626] rounded-md">
            <span className=" w-14 h-14  flex justify-center items-center rounded-full bg-[#1e1b4b]/70 ">
              <Code className="  text-blue-500 z-10" />
            </span>
            <p className="">Free to Start</p>
            <p className="  w-10/12 text-center text-[#d4d4d4]/79">
              Begin with hundreds of free problems
            </p>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default LandingPage;
