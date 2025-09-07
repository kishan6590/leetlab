import React from "react";
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import logo from "../assets/logo.png";
function Navbar() {
  const { authUser } = useAuthStore();

  console.log("AUTH_USER", authUser);

  const getInitialName = () => {
    const name = authUser?.name;
    let firstLetter = name?.charAt(0).toUpperCase();
    console.log("first", firstLetter);
    return firstLetter;
  };
  // border border-gray-200/10
  return (
    <nav className="sticky top-0 z-50 w-full py-5  ">
      <div className="flex w-full justify-between  mx-auto max-w-[980px] bg-[#0a0a0a]/5 shadow-sm shadow-teal-800 backdrop-blur-lg  px-4 py-2 rounded-2xl  ">
        <Link to="/" className=" cursor-pointer ">
          <img
            src="/procoder.png"
            className="    text-white px-2 py-2 rounded-full w-60 "
          />
        </Link>

        {/* User Profile and Dropdown */}
        <div className="flex items-center gap-8    font-Lato ">
          <Link to="/" className=" hover:text-emerald-400">Home</Link>
          <Link   to="/home" className=" hover:text-emerald-400">Problems</Link>

          <Link  to="/about" className=" hover:text-emerald-400">About</Link>
        
         
          <Link className=" hover:text-emerald-400">Sign In</Link>
          <Link className="bg-[#059669] px-4 py-2 rounded-full text-black hover:bg-emerald-900 hover:text-white hover:scale-105 transition-transform duration-200" >Sign Up</Link>
          {authUser && <Link>Home</Link>}
          {authUser && (
            <div className="dropdown dropdown-end ">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar flex flex-row "
              >
                <div className="w-10 rounded-full ">
                  {authUser?.image ? (
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="avatar"
                    />
                  ) : (
                    <div className="bg-[#99f6e4] text-black flex items-center justify-center w-full h-full rounded-full">
                      {getInitialName()}
                    </div>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 space-y-3"
                style={{
                  background:
                    "linear-gradient(to bottom right,#09090b 5% ,#171717 40%,#1f2937)",
                }}
              >
                {/* Admin Option */}

                {/* Common Options */}
                <li>
                  <p className="text-base font-semibold">{authUser?.name}</p>
                  <hr className="border-gray-200/10" />
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </li>
                {authUser?.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="hover:bg-primary hover:text-white text-base font-semibold"
                    >
                      <Code className="w-4 h-4 mr-1" />
                      Add Problem
                    </Link>
                  </li>
                )}
                <li>
                  <LogoutButton className="hover:bg-primary  hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </LogoutButton>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
