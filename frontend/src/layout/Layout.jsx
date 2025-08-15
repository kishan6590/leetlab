import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div
      className=" w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right,#09090b 5% ,#171717 60%,#09090b )",
        // background:"none"

        // backgroundRepeat: "no-repeat"
      }}
    >
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
