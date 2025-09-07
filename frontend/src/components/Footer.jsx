import React from "react";
import { motion } from "motion/react";
import { Code, Github, Mail, Linkedin, Copyright } from "lucide-react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <motion.div
        className="  p-6  border-[#737373]/30 mt-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex  gap-5 justify-between px-10  border-t   border-[#737373]/30 py-10">
          <div className="   flex  flex-col gap-3.5 w-1/3 ">
            <h2 className=" flex gap-4 text-2xl font-semibold items-center">
              <span className="text-blue-600 ">
                <Code className="w-8 h-8" />
              </span>
              ProCoder
            </h2>
            <p className="  w-[70%] text-[#d4d4d4]/79">
              Empowering developers worldwide to master coding skills and
              achieve their career goals.
            </p>
          </div>
          <div className="   text-[#d4d4d4]/79">
            <h2 className=" text-white font-bold  "> Company</h2>

            <div className="flex flex-col gap-2 px-2 py-2">
              <Link to="/about">About</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>

          <div className=" text-[#d4d4d4]/79  ">
            <h2 className="text-white font-bold px-3">Connect</h2>
            <div className="flex  justify-center items-center gap-3 px-3 py-3 ">
              <a href="">
                <Github />
              </a>

              <a href="">
                <Linkedin size={16} strokeWidth={1.25} />
              </a>
              <a href="">
                <Mail size={16} strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className=" py-2 px-7 "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className=" border-t border-[#737373]/30 py-8">
          <p className=" flex justify-center items-center text-[#d4d4d4]/79 text-sm">
            <span>
              <Copyright size={16} strokeWidth={1.25} />
            </span>
            ProCoder. All rights reserved. Built with passion for developers.
          </p>
        </div>
      </motion.div>
    </>
  );
}

export default Footer;
