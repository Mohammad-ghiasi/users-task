import { cookies } from "next/headers";
import HeaderContent from "./HeaderContent";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";

export default function Header() {
  const token = cookies().get("token");
  const isLogin = !!token; // بررسی اینکه توکن وجود داره یا نه

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 px-3 py-3 md:px-10 flex justify-between items-center text-gray-700 font-semibold z-50">
      {/* Logo */}
      <div className="">
        {" "}
        <Link href="/" className="text-[#2E614B] flex items-center">
          <MdAdminPanelSettings className="text-[#2E614B] text-3xl md:text-[40px]" />
          <span className="text-sm md:text-xl font-bold">User Manager</span>
        </Link>
      </div>

      {/* بخش ناوبری و دکمه‌ها */}
      <div className="">
        <HeaderContent isLogin={isLogin} />
      </div>
    </nav>
  );
}
