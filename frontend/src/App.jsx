import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

import HomePage from "../src/page/HomePage";
import LoginPage from "../src/page/LoginPage";
import SignUpPage from "../src/page/SignUpPage";

function App() {
  let authUser = null;
  return (
    <>
      <div
        className=" flex flex-col items-center justify-start "
        style={{
          background:
            "linear-gradient(113deg, rgba(42, 123, 155, 1) 0%, rgba(34, 122, 78, 1) 66%)",
        }}
      >
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
