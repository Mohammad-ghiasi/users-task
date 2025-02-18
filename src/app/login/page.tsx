"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import api from "@/utils/api";
import Cookies from "js-cookie";
import useCustomToast from "@/hooks/ToastNotification ";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ILoginForm } from "@/types/myTypes";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from "@/components/UI/Button";
import { useState } from "react";
import InputField from "@/components/UI/Input";

const LoginForm = () => {
  const triggerToast = useCustomToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm) => {
    try {
      setLoading(true);
      const res = await api.post("/users/login", data);

      if (res.data?.token) {
        Cookies.set("token", res.data.token, { expires: 7 });
        Cookies.set("hashedId", res.data.userIdHash, { expires: 7 });
        setLoading(false);
        window.location.href = "/users";
      } else {
        triggerToast({
          title: "Unexpected error: Token not found.",
          status: "error",
        });
        setLoading(false);
      }
    } catch (error: any) {
      triggerToast({
        title:
          error.response?.data?.message || "Login failed. Please try again.",
        status: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <InputField
          placeholder="Email"
          icon={<FaEnvelope />}
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email?.message}
        />
        {/* Password */}
        <InputField
          placeholder="Password"
          icon={<FaLock />}
          register={register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full shadow-md" isLoading={loading}>
          Login
        </Button>

        {/* Signup Link */}
        <p className="text-[11px] md:text-[13px] text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 underline hover:text-green-700"
          >
            Create one
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
