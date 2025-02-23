"use client";
import { useState, useMemo, useCallback } from "react";
import { FaUserEdit } from "react-icons/fa";
import { User } from "@/types/myTypes";
import Button from "./UI/Button";
import dynamic from "next/dynamic";
import Avatar from "./UI/Avatar";
import UserInfo from "./users/UserInfo";


// Dynamic imports with SSR disabled
const EditModal = dynamic(() => import("@/components/EditModal"), { ssr: false });
const RemoveUser = dynamic(() => import("./RemoveUser"), { ssr: false });

export default function UserItem({ user, hashedId }: { user: User; hashedId: string | undefined }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Optimized calculations & event handlers
  const isCurrentUser = useMemo(() => user._id.slice(-6) === hashedId, [user._id, hashedId]);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <div
        className={`${
          isCurrentUser ? "bg-green-100 border-green-500" : "bg-white border-gray-200"
        } shadow-lg hover:shadow-xl transition-shadow duration-200 p-8 rounded-2xl border max-w-3xl w-full mx-auto`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8 text-center sm:text-left">
          {/* Profile Avatar */}
          <Avatar firstname={user.firstname[0]} lastname={user.lastname[0]} />

          {/* User Information */}
          <UserInfo userData={user} />

          {/* Action Buttons */}
          <div className="flex flex-row space-x-4 mt-6 sm:mt-0 sm:flex-col items-center justify-center sm:space-y-4 sm:space-x-0">
            <Button className="ownstyle p-3 rounded-full bg-[#2E614C]" onClick={openModal}>
              <FaUserEdit className="text-lg text-white" />
            </Button>
            <RemoveUser id={user._id} />
          </div>
        </div>
      </div>

      {/* Lazy load modal */}
      {isModalOpen && <EditModal user={user} isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
}
