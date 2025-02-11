import { useEffect, useState } from "react";
import {
  FaSave,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { EditModalProps, User } from "@/types/myTypes";
import api from "@/utils/api";
import Cookies from "js-cookie";
import { mutate } from "swr";
import { toast, ToastContainer } from "react-toastify";
import Button from "./UI/Button";

export default function EditModal({ user, isOpen, onClose }: EditModalProps) {
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({ defaultValues: user });
  const [loading, setLoading] = useState<boolean>(false);

  // Set default values when modal opens
  useEffect(() => {
    if (isOpen) {
      setValue("firstname", user.firstname);
      setValue("lastname", user.lastname);
      setValue("email", user.email);
      setValue("job", user.job);
    }
  }, [isOpen, user, setValue]);

  const handleSave = async (updatedUser: User) => {
    try {
      setLoading(true);
      await api
        .put(`/users/updateUsers/${updatedUser._id}`, updatedUser, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          mutate(
            "users",
            (prevdata: any) => {
              const updates = prevdata.users.map((user: User) =>
                user._id === res.data.updatedUser._id
                  ? res.data.updatedUser
                  : user
              );
              return { ...prevdata, users: [...updates] };
            },
            false
          );
          toast.success("User updated successfully!", {
            position: "top-center",
          });
          setLoading(false);
          onClose();
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Failed to update user!", {
            position: "top-center",
          });
          setLoading(false);
        });
    } catch (err) {
      toast.error("Failed to update user.", { position: "top-center" });
      setLoading(false);
    }
  };

  const onSubmit = (updatedUser: User) => {
    handleSave(updatedUser);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white backdrop-blur-lg shadow-xl rounded-xl p-6 w-full max-w-md animate-fadeIn">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-all"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                  className="w-full focus:outline-none"
                />
              </div>
              {errors.firstname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                  className="w-full focus:outline-none"
                />
              </div>
              {errors.lastname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Job */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Job
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FaBriefcase className="text-gray-400 mr-2" />
                <input
                  type="text"
                  {...register("job", { required: "Job is required" })}
                  className="w-full focus:outline-none"
                />
              </div>
              {errors.job && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.job.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <Button
                className="bg-gray-200 hover:bg-gray-400"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={loading}>
                <FaSave className="mr-2" />
                Save
              </Button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    )
  );
}
