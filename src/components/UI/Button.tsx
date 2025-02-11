import clsx from "clsx";
import { ButtonProps } from "@/types/myTypes";
import { FaSpinner } from "react-icons/fa"; // آیکون لودینگ

export default function Button({ children, className = "", isLoading, ...props }: ButtonProps) {
  const useOnlyCustomStyles = className.startsWith("ownstyle");
  const hasCustomColor = className.includes("bg-") || className.includes("text-");

  return (
    <button
      className={clsx(
        "relative", // برای جایگذاری اسپینر
        !useOnlyCustomStyles && "px-4 py-2 cursor-pointer rounded-lg flex items-center justify-center active:scale-95 transition-all",
        !useOnlyCustomStyles && !hasCustomColor && "bg-[#499276] hover:bg-[#2d6a4f] text-white",
        className.replace("myownstyle", "").trim(), // حذف "myownstyle" از کلاس نهایی
        isLoading && "opacity-60 cursor-not-allowed" // تغییر استایل وقتی داره لود میشه
      )}
      disabled={isLoading} // جلوگیری از کلیک در حالت لودینگ
      {...props}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin text-white text-2xl" />
      ) : (
        children
      )}
    </button>
  );
}
