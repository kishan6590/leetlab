import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout.jsx";

import HomePage from "../src/page/HomePage";
import LoginPage from "../src/page/LoginPage";
import SignUpPage from "../src/page/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import apiClient from "../service/apiClient";
import { Loader } from "lucide-react";
import AdminRoute from "./components/AdminRoute.jsx";
import AddProblem from "./page/AddProblem.jsx";

function App() {
  const { authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    apiClient.check();
  }, []);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
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
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route element={<AdminRoute />}>
            <Route
              path="/add-problem"
              element={authUser ? <AddProblem /> : <Navigate to="/" />}
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
