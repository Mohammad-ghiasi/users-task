import { useState } from "react";
import { FaEnvelopeOpenText, FaUserEdit } from "react-icons/fa";
import EditModal from "@/components/EditModal";
import Link from "next/link";
import { User } from "@/types/myTypes";
import RemoveUser from "./RemoveUser";
import { MdOutlineDateRange, MdWork } from "react-icons/md";
import Button from "./UI/Button";

export default function UserItem({ user }: { user: User }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-8 rounded-2xl border border-gray-200 max-w-2xl w-full mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8 text-center sm:text-left">
          {/* Profile Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#7BAF97] to-[#4A7C59] text-white flex items-center justify-center text-4xl font-bold shadow-lg">
              {user.firstname[0]}
              {user.lastname[0]}
            </div>
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md"></span>
          </div>

          {/* User Information */}
          <div className="flex-grow mt-6 sm:mt-0">
            <Link href={`/users/${user._id}`} className="block">
              <p className="text-xl sm:text-2xl font-semibold text-gray-900 hover:text-[#2d6a4f] transition-colors">
                {`${user.firstname} ${user.lastname}`}
              </p>
              <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center sm:justify-start mt-2">
                <FaEnvelopeOpenText className="mr-3 text-[#2d6a4f] text-xl" />
                {user.email}
              </p>
              <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center sm:justify-start mt-2">
                <MdWork className="mr-3 text-[#2d6a4f] text-xl" />
                {user.job}
              </p>
              <p className="text-sm sm:text-lg text-gray-600 flex items-center justify-center sm:justify-start mt-2">
                <MdOutlineDateRange className="mr-3 text-[#2d6a4f] text-xl" />
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row space-x-4 mt-6 sm:mt-0 sm:flex-col items-center justify-center sm:space-y-4 sm:space-x-0">
            <Button
              className="ownstyle p-3 rounded-full bg-[#6a9c89] hover:bg-[#2d6a4f] transition-all duration-200 text-white shadow-lg hover:scale-110"
              onClick={() => setIsModalOpen(true)}
            >
              <FaUserEdit className="text-lg" />
            </Button>
            <RemoveUser id={user._id} />
          </div>
        </div>
      </div>

      <EditModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
