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
import { Loader, User } from "lucide-react";
import AdminRoute from "./components/AdminRoute.jsx";
import AddProblem from "./page/AddProblem.jsx";
import ProblemPage from "./page/ProblemPage.jsx";
import UserProfile from "./page/UserProfile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LandingPage from "./page/LandingPage.jsx";
import PrivacyPage from "./page/PrivacyPage.jsx";
import TermsPage from "./page/TermsPage.jsx";
import AboutPage from "./page/AboutPage.jsx";
function App() {
  const { authUser, isCheckingAuth, setIsCheckingAuth } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      await apiClient.check();
    };
    verifyAuth();
  }, []);
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <div
        className=" flex flex-col items-center justify-start  "
        style={{
          background:
            "linear-gradient(to bottom right,#09090b 5% ,#171717 60%,#09090b )",
        }}
      >
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={!authUser ? <LandingPage /> : <Navigate to="/home" />}
            />

            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />

          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}
          />

          {console.log("AUTH_USER-->>>>>>", authUser, isCheckingAuth)}

          <Route element={<PrivateRoute />}>
            <Route
              path="/home"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/problem/:id"
              element={authUser ? <ProblemPage /> : <LoginPage />}
            />

            <Route
              path="/home"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={authUser ? <UserProfile /> : <LoginPage />}
            />
          </Route>
          <Route element={<AdminRoute />}>
            <Route
              path="/add-problem"
              element={authUser ? <AddProblem /> : <LoginPage />}
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
// home route set up kr then build landing page then profle page
