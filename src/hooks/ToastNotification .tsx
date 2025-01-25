// hooks/useCustomToast.ts
import { CustomToast } from "@/types/myTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const useCustomToast = () => {
  const triggerToast = ({ status, title, options }: CustomToast) => {
    switch (status) {
      case "success":
        toast.success(title, {
          position: "top-center",
          autoClose: 1300,
          ...options,
        });
        break;
      case "error":
        toast.error(title, {
          position: "top-center",
          autoClose: 1300,
          ...options,
        });
        break;
      case "warning":
        toast.warning(title, {
          position: "top-center",
          autoClose: 1300,
          ...options,
        });
        break;
      case "info":
        toast.info(title, {
          position: "top-center",
          autoClose: 1300,
          ...options,
        });
        break;
      default:
        toast(title, { position: "top-center", autoClose: 1300, ...options });
    }
  };

  return triggerToast;
};

export default useCustomToast;
