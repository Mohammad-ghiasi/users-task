import clsx from "clsx";
import { ButtonProps } from "@/types/myTypes";
import { FaSpinner } from "react-icons/fa"; // آیکون لودینگ

export default function Button({
  children,
  className = "",
  isLoading,
  ...props
}: ButtonProps) {
  const useOnlyCustomStyles = className.startsWith("ownstyle");
  const hasCustomColor =
    className.includes("bg-") || className.includes("text-");

  return (
    <button
      name="componentbtn"
      id="combo"
      aria-label={isLoading ? "Loading, please wait" : "Submit button"} // متن توصیفی بهتر
      title={isLoading ? "Loading..." : "Click to submit"} // نمایش توضیح هنگام هاور
      className={clsx(
        "transition-all active:scale-95",
        !useOnlyCustomStyles &&
          "px-4 py-2 cursor-pointer rounded-lg flex items-center justify-center relative",
        !useOnlyCustomStyles &&
          !hasCustomColor &&
          "bg-[#2E614C] hover:bg-[#2d6a4f] text-white",
        className.replace("myownstyle", "").trim(),
        isLoading && "opacity-60 cursor-not-allowed"
      )}
      disabled={isLoading}
      aria-live="polite" // اطلاع‌رسانی تغییرات به صفحه‌خوان‌ها
      {...props}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin text-white text-2xl" />
          <span className="sr-only">Loading...</span>{" "}
          {/* متن مخفی برای صفحه‌خوان */}
        </>
      ) : (
        children
      )}
    </button>
  );
}
