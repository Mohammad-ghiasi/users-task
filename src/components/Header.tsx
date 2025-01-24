"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the token cookie on component mount
  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const linkStyles = (path: string) =>
    pathname === path ? "text-black font-bold" : "hover:text-gray-300";

  return (
    <div className="py-2 mt-2 md:mt-5 ps-1 shadow-md flex flex-row space-x-4 md:space-x-10 font-semibold text-gray-500 transition-all text-[13px] md:text-[16px]">
      <Link href="/" className={linkStyles("/")}>
        Home
      </Link>
      <Link href="/users" className={linkStyles("/users")}>
        Users
      </Link>
      {isLoggedIn ? (
        <>
          <Link
            href="/"
            onClick={() => {
              // Clear the token cookie and log out
              Cookies.remove("token");
              setIsLoggedIn(false);
              window.location.reload();
            }}
            className={linkStyles("/logout")}
          >
            Logout
          </Link>
          <Link href="/adduser">Add user</Link>
        </>
      ) : (
        <Link href="/login" className={linkStyles("/login")}>
          Login
        </Link>
      )}
    </div>
  );
}
