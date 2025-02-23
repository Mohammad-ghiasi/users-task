import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaEnvelopeOpenText } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { User } from "@/types/myTypes";


export default function UserInfo({userData}: {userData: User}) {
  return (
    <div className="flex-grow mt-6 sm:mt-0 ">
      <Link href={`/users/${userData._id}`}>
        <p className="text-xl sm:max-md:text-cente sm:text-2xl font-semibold text-gray-900 hover:text-[#2d6a4f] transition-colors">
          {`${userData.firstname} ${userData.lastname}`}
        </p>

        <div className="flex flex-col items-start space-y-2">
          <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center sm:justify-start mt-2">
            <FaEnvelopeOpenText className="mr-3 text-[#2d6a4f] text-xl" />
            {userData.email}
          </p>
          <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center sm:justify-start mt-2">
            <MdWork className="mr-3 text-[#2d6a4f] text-xl" />
            {userData.job}
          </p>
          <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center sm:justify-start mt-2">
            <FaCalendarAlt className="mr-3 text-[#2d6a4f] text-xl" />
            Joined: {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}
