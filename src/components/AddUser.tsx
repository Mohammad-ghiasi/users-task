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
import InputField from "./UI/Input";

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
      setLoading(true);
      console.log(data);
      
      const res = await api.post("/users/signup", data);
      if (res.status === 201) {
        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 7 });
        }
        mutate(
          "users",
          (prevdata: any) => ({
            ...prevdata,
            users: [...(prevdata?.users || []), res.data?.createdNewUser],
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

        <InputField
          placeholder="First Name"
          icon={<FaUser />}
          register={register("firstname", {
            required: "First name is required",
          })}
          error={errors.firstname?.message}
        />
        {/* Last Name */}
        <InputField
          placeholder="Last Name"
          icon={<FaUser />}
          register={register("lastname", { required: "Last name is required" })}
          error={errors.lastname?.message}
        />
        {/* Email */}
        <InputField
          placeholder="Email"
          icon={<FaEnvelope />}
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email?.message}
        />
        {/* Password */}
        <InputField
          placeholder="Password"
          icon={<FaLock />}
          register={register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
          error={errors.password?.message}
        />
        {/* Job */}
        <InputField
          placeholder="Job"
          icon={<FaBriefcase />}
          register={register("job", { required: "Job is required" })}
          error={errors.job?.message}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full shadow-md" isLoading={loading}>
          Sign Up
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}