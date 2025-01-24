// hooks/useCustomToast.ts
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastStatus = "success" | "error" | "warning" | "info";

interface CustomToast {
  status: ToastStatus;
  title: string;
  options?: ToastOptions;
}

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
