"use client";

import { useState } from "react";
import { BiMap } from "react-icons/bi";
import { MdAddLocationAlt } from "react-icons/md";
import Button from "../UI/Button";
import Link from "next/link";
import api from "@/utils/api";
import AddressItem from "../AddressItem";
import { Address } from "@/types/myTypes";



export default function AddressManager({
  userId,
  initialAddresses,
  hashedId,
  token,
  cashDeleter,
}: {
  userId: string;
  initialAddresses: Address[];
  hashedId: string | undefined;
  token: string | undefined;
  cashDeleter: () => Promise<void>;
}) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);


  const isOwn: boolean = userId.slice(-6) === hashedId;

  const deleteAddress = async (id: string) => {
    try {
      cashDeleter();
      await api.delete(`/address/deleteaddress/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <>
      <div className="max-w-2xl  mt-10">
        <h2 className="text-lg md:text-2xl font-bold text-[#499276] flex items-center gap-2">
          <BiMap className="text-2xl md:text-3xl" />
          Manage Addresses
        </h2>

        {/* Address List */}
        {addresses.length > 0 ? (
          <div className="mt-4 space-y-3">
            {addresses.map((address) => (
              <AddressItem
                key={address._id}
                address={address}
                isOwn={isOwn}
                deleteAddress={deleteAddress}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No addresses found.</p>
        )}

        {/* Address Form */}
        {isOwn && (
          <Link href="/map">
            <Button type="button" className="mt-4 w-full">
              Add Address
              <MdAddLocationAlt className="w-5 h-5" />
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
