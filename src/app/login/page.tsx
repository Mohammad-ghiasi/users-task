"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useCustomToast from "@/hooks/ToastNotification ";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ILoginForm } from "@/types/myTypes";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const triggerToast = useCustomToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
    try {
      const res = await api.post("/users/login", data);

      if (res.data?.token) {
        Cookies.set("token", res.data.token, { expires: 7 });
        window.location.href = "/users";
      } else {
        triggerToast({
          title: "Unexpected error: Token not found.",
          status: "error",
        });
      }
    } catch (error: any) {
      triggerToast({
        title: error.response?.data?.message || "Login failed. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Email"
            className="w-full pl-10 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="w-full pl-10 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all shadow-md active:scale-95"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-[11px] md:text-[13px] text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-600 underline hover:text-green-700">
            Create one
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
