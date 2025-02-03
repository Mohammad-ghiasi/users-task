import { useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { EditModalProps, User } from "@/types/myTypes";
import api from "@/utils/api";
import Cookies from "js-cookie";
import { mutate } from "swr";
import { toast, ToastContainer } from "react-toastify";
export default function EditModal({ user, isOpen, onClose }: EditModalProps) {
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user,
  });

  // for default value form input
  useEffect(() => {
    if (isOpen) {
      // Reset form values when the modal opens
      setValue("firstname", user.firstname);
      setValue("lastname", user.lastname);
      setValue("email", user.email);
      setValue("job", user.job);
    }
  }, [isOpen, user, setValue]);

  const handleSave = async (updatedUser: User) => {
    try {
      mutate(
        "users",
        (prevdata: any) => {
          const updates = prevdata.users.map((user: User) => {
            return user._id === updatedUser._id ? updatedUser : user;
          });
          return { ...prevdata, users: [...updates] };
        },
        false
      );
      await api
        .put(`/users/updateUsers/${updatedUser._id}`, updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          mutate(
            "users",
            (prevdata: any) => {
              const updates = prevdata.users.map((user: User) => {
                return user._id === res.data.updatedUser._id
                  ? res.data.updatedUser
                  : user;
              });
              return { ...prevdata, users: [...updates] };
            },
            false
          );
          onClose();
        })
        .catch((err) => {
          mutate(
            "users",
            (prevdata: any) => {
              return prevdata;
            },
            false
          );
          toast.error("Faild to update user.", {
            position: "top-center",
          });
        });
    } catch (err) {
      toast.error("Faild to update user.", {
        position: "top-center",
      });
    }
  };

  const onSubmit = (updatedUser: User) => {
    handleSave(updatedUser);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                {errors.firstname && (
                  <p className="text-red-500 text-xs">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-xs">
                    {errors.lastname.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="job"
                  className="block text-sm font-medium text-gray-600"
                >
                  Job
                </label>
                <input
                  type="text"
                  id="job"
                  {...register("job", { required: "Job is required" })}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                {errors.job && (
                  <p className="text-red-500 text-xs">{errors.job.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
                >
                  <FaSave className="mr-2" />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
}
