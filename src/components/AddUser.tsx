"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/utils/api"; // Assuming you have a centralized Axios instance
import { toast, ToastContainer } from "react-toastify";
import { addUserProp, ISignupForm } from "@/types/myTypes";



export default function AddUser({ redirect }: addUserProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    try {
      // Send signup request
      const res = await api.post("/users/signup", data);

      // Check if the signup was successful
      if (res.status === 201) {
        // Save token to cookie if returned
        if (res.data.token) {
          Cookies.set("token", res.data.token, { expires: 7 });
        }

        // Show success message
        toast.success("Account created successfully! Redirecting...", {
          position: "top-center",
        });
        if (redirect) {
          router.push(redirect);
        }
      }
    } catch (error: any) {
      // Handle errors and show feedback
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
        { position: "top-center" }
      );
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="firstname" className="block font-medium">
            First Name
          </label>
          <input
            {...register("firstname", { required: "First name is required" })}
            id="firstname"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastname" className="block font-medium">
            Last Name
          </label>
          <input
            {...register("lastname", { required: "Last name is required" })}
            id="lastname"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
            id="email"
            type="email"
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            id="password"
            type="password"
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message ||
                "Password must be at least 6 characters"}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="job" className="block font-medium">
            Job
          </label>
          <input
            {...register("job", { required: "Job is required" })}
            id="job"
            type="text"
            className="w-full border rounded px-3 py-2"
          />
          {errors.job && (
            <p className="text-red-500 text-sm">{errors.job.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
