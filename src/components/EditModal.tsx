import { useState } from "react";
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
import InputField from "./UI/Input";

export default function EditModal({ user, isOpen, onClose }: EditModalProps) {
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ defaultValues: user });
  const [loading, setLoading] = useState<boolean>(false);


  const handleSave = async (updatedUser: User) => {
    try {
      setLoading(true);
      await api
        .put(`/users/updateuser/${updatedUser._id}`, updatedUser, {
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
              register={register("lastname", {
                required: "Last name is required",
              })}
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
                  message: "Invalid email format",
                },
              })}
              error={errors.email?.message}
            />
            {/* Job */}
            <InputField
              placeholder="Job"
              icon={<FaBriefcase />}
              register={register("job", { required: "Job is required" })}
              error={errors.job?.message}
            />
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
// 207