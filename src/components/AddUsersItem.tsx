import { BiPencil, BiTrash } from "react-icons/bi";
import { useState } from "react";
import { AddressItemProps } from "@/types/myTypes";
import dynamic from "next/dynamic";
const ModalEditAddress = dynamic(() => import("./EditeAddressModal"), { ssr: false });


export default function AddressItem({
  address,
  isOwn,
  deleteAddress,
}: AddressItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <div
        key={address._id}
        className="p-2 md:p-4 rounded-lg flex flex-col md:flex-row items-center sm:max-md:space-y-3 md:justify-between md:items-center shadow-sm md:hover:shadow-md transition-all md:border-l-2 border-[#499276]"
      >
        <div className="w-full flex flex-col items-center md:items-start space-y-2">
          <p className="font-semibold text-gray-900">{address.addressName}</p>
          <p
            className="text-sm text-gray-600 text-center md:text-start truncate w-[85%]"
            title={address.address}
          >
            {address.address}
          </p>
        </div>
        {isOwn && (
          <div className="flex space-x-3 mt-2 sm:mt-0">
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-[#499276] hover:text-[#3a7b5d] transition"
            >
              <BiPencil className="text-xl" />
            </button>
            <button
              onClick={() => deleteAddress(address._id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <BiTrash className="text-xl" />
            </button>
          </div>
        )}
      </div>
      <ModalEditAddress
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        address={address}
      />
    </>
  );
}
