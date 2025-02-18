"use client";
import { FaAddressBook, FaAddressCard, FaPlus } from "react-icons/fa";
import Button from "../UI/Button";
import { useForm } from "react-hook-form";
import { locationFormType } from "@/types/myTypes";
import { MdAddLocationAlt } from "react-icons/md";
import api from "@/utils/api";
import Cookies from "js-cookie";
import { cashDeleter } from "@/utils/cashDeleter";
import { useRouter } from "next/navigation";

export default function AddAddressForm({
  defaulValue,
  loading,
}: {
  defaulValue: string;
  loading: boolean;
}) {
  const token = Cookies.get("token");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<locationFormType>({
    defaultValues: {
      address: defaulValue,
    },
  });

  const onSubmit = async (data: locationFormType) => {
    console.log("User Input:", data.addressName);
    try {
      const response = await api.post(
        "/address/newaddress",
        { ...data, lat: 1, lng: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 201) {
        console.log("added");
        cashDeleter();
        reset();
        setTimeout(() => router.back(), 500);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 "
    >
      <div className="flex flex-col justify-center relative">
        <FaAddressBook className="absolute left-3 top-3 text-gray-400 text-[16px]" />
        <input
          {...register("addressName", {
            required: "Location is required!",
            minLength: {
              value: 3,
              message: "At least 3 characters required!",
            },
            maxLength: { value: 255, message: "Too long!" },
          })}
          type="text"
          placeholder="Enter addressName..."
          className={`pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 shadow ${
            errors.addressName
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-green-500"
          } `}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-col justify-center relative">
        <FaAddressBook className="absolute left-3 top-3 text-gray-400 text-[16px]" />
        <input
          {...register("address", {
            required: "address is required!",
            minLength: {
              value: 3,
              message: "At least 3 characters required!",
            },
            maxLength: { value: 255, message: "Too long!" },
          })}
          type="text"
          placeholder="Enter address..."
          className={`pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 shadow ${
            errors.address
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-green-500"
          } `}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting || loading}
        className="w-full"
      >
        Add Address
        <MdAddLocationAlt className="w-5 h-5 ms-1" />
      </Button>
    </form>
  );
}
