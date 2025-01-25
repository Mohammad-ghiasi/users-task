"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useCustomToast from "@/hooks/toast/ToastNotification ";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ILoginForm } from "@/types/myTypes";



const LoginForm = () => {
  const triggerToast = useCustomToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  // Handle form submission
  const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
    try {
      // Send login request
      const res = await api.post("/users/login", data);
  
      // Check if token exists in the response
      if (res.data?.token) {
        // Save token to a cookie (expires in 7 days)
        Cookies.set("token", res.data.token, { expires: 7 });
  
        // Redirect and reload
        window.location.href = "/users"; // Redirect to /users and reload
      } else {
        triggerToast({
          title: "Unexpected error: Token not found.",
          status: "error",
        });
      }
    } catch (error: any) {
      triggerToast({
        title:
          error.response?.data?.message || "Login failed. Please try again.",
        status: "error",
      });
    }
  };
  

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Please enter a valid email address",
              },
            })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-[11px] md:text-[13px] text-gray-500">
          Dont have account?{" "}
          <span className="text-blue-600 underline">
            <Link href="/signup">create on</Link>
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
