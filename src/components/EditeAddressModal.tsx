"use client";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FaAddressBook, FaEdit, FaSave, FaTimes, FaUser } from "react-icons/fa";
import api from "@/utils/api";
import { cashDeleter } from "@/utils/cashDeleter";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "./UI/Button";
import { EditAddressProps } from "@/types/myTypes";
import InputField from "./UI/Input";
import { FaLocationDot } from "react-icons/fa6";

export default function ModalEditAddress({
  isOpen,
  onClose,
  address,
}: EditAddressProps) {
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      addressName: address.addressName,
      address: address.address,
    },
  });
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      const finalData = { id: address._id, ...data };

      const response = await api.put("/address/editaddress", finalData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        console.log("Address updated successfully!");
        cashDeleter();
        reset();
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white backdrop-blur-md shadow-xl shadow-gray-300 border rounded-xl p-6 w-full max-w-md animate-fadeIn">
        {/* close btn*/}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-all"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* edite address form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* address title */}

          <InputField
            placeholder="Address Title"
            icon={<FaAddressBook />}
            register={register("addressName", {
              required: "Name is required!",
              minLength: 3,
            })}
            error={errors.addressName?.message}
          />
          {/* address */}
          <InputField
            placeholder="Address"
            icon={<FaLocationDot />}
            register={register("address", {
              required: "Address is required!",
              minLength: 5,
            })}
            error={errors.address?.message}
          />

          {/* actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              <FaSave className="mr-2" />
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
