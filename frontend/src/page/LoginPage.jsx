import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code, CodeXml, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { loginSchema } from "../schemas/userSchema";
import Lottie from "lottie-react";
import helloRobot from "../assets/hello-robot.json";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import apiClient from "../../service/apiClient";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingUp } = useAuthStore;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await apiClient.login(data);

      console.log("login data", data);
    } catch (error) {
      console.error(`Login in failed `, error);
    }
  };
  console.log(errors);
  return (
    <div className="  h-screen grid lg:grid-cols-2  ">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 px-5 shadow-2xl pt-5 pb-5  ">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-blue-950/10 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                <CodeXml className="w-6 h-6 text-sky-900" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome </h1>
              <p className="text-base-content/60">Log in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5  px-8 ">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full px-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 ">
                  <Lock className="h-5 w-5 text-base-content/40 " />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`input input-bordered w-full px-10 overflow-hidden   ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40  " />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40 " />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingUp}
            >
              {isLoggingUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?
              <Link to="/signup" className="link text-blue-950">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* //right side  */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <Lottie animationData={helloRobot} loop={true} />
      </div>
    </div>
  );
}

export default LoginPage;
