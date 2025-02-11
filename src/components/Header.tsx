"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import Button from "./UI/Button";
import { MdAdminPanelSettings } from "react-icons/md";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  // بستن منو هنگام کلیک روی هر جای صفحه
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

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 px-6 py-3 md:px-10 flex justify-between items-center text-gray-700 font-semibold z-50">
      {/* Logo */}
      <Link href="/" className="text-[#2d6a4f] flex items-center">
        <MdAdminPanelSettings className=" text-[#4A7C59] text-3xl md:text-[40px]" />
        <span className="text-sm md:text-xl font-bold">User Manager</span>
      </Link>

      {/* Links */}
      <div className="hidden md:flex space-x-8 text-lg">
        <NavLink
          href="/"
          label="Home"
          active={pathname === "/"}
          icon={<FaHome />}
        />
        <NavLink
          href="/users"
          label="Users"
          active={pathname === "/users"}
          icon={<FaUsers />}
        />
      </div>

      {/* Auth Buttons / Dropdown */}
      <div className="relative menu-container">
        {isLoggedIn ? (
          <div className="relative">
            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-3xl"
            >
              <FaUserPlus />
              Account
            </Button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                <Link
                  href="/adduser"
                  className="block px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaUserPlus className="mr-2 text-[#2d6a4f]" />
                  Add User
                </Link>
                <Button
                 onClick={handleLogout}
                  className="ownstyle w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-[#6a9c89] text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-[#2d6a4f] transition-all"
          >
            <FaSignInAlt />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({ href, label, active, icon }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 ${
        active
          ? "text-[#2d6a4f] font-bold border-b-2 border-[#2d6a4f]"
          : "hover:text-gray-500"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
