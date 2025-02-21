"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaUserPlus, FaSignInAlt, FaHome, FaUsers } from "react-icons/fa";
import Button from "../UI/Button";
import NavLink from "./NavLink";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("./Menu"), { ssr: false });

export default function HeaderContent({ isLogin }: { isLogin: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center space-x-10">
      {/* Links */}
      <div className="hidden md:flex space-x-8 text-lg">
        <NavLink href="/" label="Home" active={pathname === "/"} icon={<FaHome />} />
        <NavLink href="/users" label="Users" active={pathname === "/users"} icon={<FaUsers />} />
      </div>

      {/* Auth Buttons / Dropdown */}
      <div className="relative">
        {isLogin ? (
          <div className="relative">
            <Button onClick={() => setMenuOpen((prev) => !prev)} className="rounded-[45px]">
              <FaUserPlus className="me-1 text-[14px] md:text-[15px]" />
              <span className="text-sm md:text-[15px]">Account</span>
            </Button>

            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        ) : (
          <Link href="/login" className="bg-[#499276] text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all">
            <FaSignInAlt />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
