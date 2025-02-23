import Link from "next/link";

const NavLink = ({ href, label, active, icon }: any) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 ${
        active
          ? "text-[#2E614B] font-bold"
          : "hover:text-gray-500"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;