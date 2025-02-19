"use client";
import { FaAddressBook } from "react-icons/fa";
import Button from "../UI/Button";
import { useForm } from "react-hook-form";
import { locationFormType } from "@/types/myTypes";
import { MdAddLocationAlt } from "react-icons/md";
import api from "@/utils/api";
import Cookies from "js-cookie";
import { cashDeleter } from "@/utils/cashDeleter";
import { useRouter } from "next/navigation";
import InputField from "../UI/Input";
import { FaLocationDot } from "react-icons/fa6";

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
      <InputField
        placeholder="Enter address title..."
        icon={<FaAddressBook />}
        register={register("addressName", {
          required: "Location is required!",
          minLength: { value: 3, message: "At least 3 characters required!" },
          maxLength: { value: 255, message: "Too long!" },
        })}
        error={errors.addressName?.message}
      />
      <InputField
        placeholder="Enter address title..."
        icon={<FaLocationDot />}
        register={register("address", {
          required: "address is required!",
          minLength: { value: 10, message: "At least 10 characters required!" },
          maxLength: { value: 255, message: "Too long!" },
        })}
        error={errors.address?.message}
      />
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
