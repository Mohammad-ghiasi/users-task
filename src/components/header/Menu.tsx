import Link from "next/link";
import { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import Logout from "./Logout";
import { menuPropType } from "@/types/myTypes";



export default function Menu({ menuOpen, setMenuOpen }: menuPropType) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        !(event.target as HTMLElement).closest(".menu-container")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
          <Link
            href="/adduser"
            className="px-4 py-2 hover:bg-gray-100 flex items-center"
          >
            <FaUserPlus className="mr-2 text-[#499276]" />
            Add User
          </Link>
          <Logout />
        </div>
      )}
    </>
  );
}
