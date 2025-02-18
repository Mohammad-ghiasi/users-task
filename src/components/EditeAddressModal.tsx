"use client";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FaEdit, FaSave } from "react-icons/fa";
import api from "@/utils/api";
import { cashDeleter } from "@/utils/cashDeleter";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "./UI/Button";
import { EditAddressProps } from "@/types/myTypes";


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
        {/* دکمه بستن */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>

        {/* عنوان */}
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FaEdit /> Edit Address
        </h2>

        {/* فرم ویرایش آدرس */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* نام آدرس */}
          <div className="relative">
            <input
              {...register("addressName", {
                required: "Name is required!",
                minLength: 3,
              })}
              type="text"
              placeholder="Address Name"
              className={`w-full p-2 border rounded ${
                errors.addressName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.addressName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.addressName.message}
              </p>
            )}
          </div>

          {/* آدرس */}
          <div className="relative">
            <input
              {...register("address", {
                required: "Address is required!",
                minLength: 5,
              })}
              type="text"
              placeholder="Address"
              className={`w-full p-2 border rounded ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* دکمه‌ها */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <FaSave className="mr-2" />
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
           
          </div>
        </form>
      </div>
    </div>
  );
}
