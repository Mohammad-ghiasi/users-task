import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import EditModal from "@/components/EditModal";
import api from "@/utils/api";
import Cookies from "js-cookie";
import { User } from "@/app/users/page";
import Link from "next/link";

export default function UserItem({
  user,
  onDelete,
  onSave,
}: {
  user: User;
  onDelete: (userId: string) => void;
  onSave: (updatedUser: User) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("token");

  const handleSave = async (updatedUser: User) => {
    try {
      await api.put(`/users/updateUsers/${updatedUser._id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the user in the parent component's state
      onSave(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <>
      <Link href={`/users/${user._id}`}>
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 items-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 sm:me-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mb-4 sm:mb-0">
              {user.firstname[0]}
              {user.lastname[0]}
            </div>

            <div className="flex-grow">
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
                {`${user.firstname} ${user.lastname}`}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 flex items-center">
                <FaEnvelope className="mr-2" />
                {user.email}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {user.job}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-row space-x-5 mt-5 md:mt-0 md:flex-col items-center justify-center md:space-y-5 md:space-x-0">
              <button
                className="hover:scale-110 transition-all"
                onClick={() => setIsModalOpen(true)}
              >
                <FaEdit color="blue" />
              </button>
              <button
                className="hover:scale-110 transition-all"
                onClick={() => onDelete(user._id)}
              >
                <FaTrash color="red" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <EditModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
