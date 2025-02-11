"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { toast, ToastContainer } from "react-toastify";
import { addUserProp, ISignupForm } from "@/types/myTypes";
import { mutate } from "swr";
import { FaUser, FaEnvelope, FaLock, FaBriefcase } from "react-icons/fa";
import Button from "./UI/Button";
import { useState } from "react";

export default function AddUser({ redirect }: addUserProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    try {
      setLoading(true)
      const res = await api.post("/users/signup", data);
      if (res.status === 201) {
        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 7 });
        }
        mutate(
          "users",
          (prevdata: any) => ({
            ...prevdata,
            users: [...prevdata.users, res.data.createdNewUser],
          }),
          false
        );

        toast.success("Account created successfully!", {
          position: "top-center",
        });
        setLoading(false);
        if (redirect) router.push(redirect);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
        {
          position: "top-center",
        }
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            {...register("firstname", { required: "First name is required" })}
            placeholder="First Name"
            className="w-full pl-10 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            {...register("lastname", { required: "Last name is required" })}
            placeholder="Last Name"
            className="w-full pl-10 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            })}
            placeholder="Email"
            className="w-full pl-10 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            })}
            type="password"
            placeholder="Password"
            className="w-full pl-10 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Job */}
        <div className="relative">
          <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
          <input
            {...register("job", { required: "Job is required" })}
            placeholder="Job"
            className="w-full pl-10 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.job && (
            <p className="text-red-500 text-sm">{errors.job.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full shadow-md" isLoading={loading}>
          Sign Up
        </Button>
        
      </form>
      <ToastContainer />
    </div>
  );
}
