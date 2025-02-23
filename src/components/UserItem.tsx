"use client";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { User } from "@/types/myTypes";
import Button from "./UI/Button";
import dynamic from "next/dynamic";
import Avatar from "./UI/Avatar";
import UserInfo from "./users/UserInfo";
import RemoveUser from "./RemoveUser";
import EditModal from "./EditModal";
// const EditModal = dynamic(() => import("@/components/EditModal"), {
//   ssr: false,
// });
// const RemoveUser = dynamic(() => import("./RemoveUser"), { ssr: false });
// const Avatar = dynamic(() => import("./UI/Avatar"), { ssr: true });
// const UserInfo = dynamic(() => import("./users/UserInfo"), { ssr: true });

export default function UserItem({
  user,
  hashedId,
}: {
  user: User;
  hashedId: string | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCurrentUser = user._id.slice(-6) === hashedId;

  return (
    <>
      <div
        className={`${
          isCurrentUser
            ? "bg-green-100 border-green-500"
            : "bg-white/80 border-gray-200"
        } backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-8 rounded-2xl border max-w-3xl w-full mx-auto`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8 text-center sm:text-left">
          {/* Profile Avatar */}
          <Avatar firstname={user.firstname[0]} lastname={user.lastname[0]} />

          {/* User Information */}
          <UserInfo userData={user} />

          {/* Action Buttons */}
          <div className="flex flex-row space-x-4 mt-6 sm:mt-0 sm:flex-col items-center justify-center sm:space-y-4 sm:space-x-0">
            <Button
              className="ownstyle p-3 rounded-full bg-[#2E614C]"
              onClick={() => setIsModalOpen(true)}
            >
              <FaUserEdit className="text-lg text-white" />
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
