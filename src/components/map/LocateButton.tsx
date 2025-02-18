import { FaCrosshairs } from "react-icons/fa";
import Button from "../UI/Button";
import { toast, ToastContainer } from "react-toastify";
import { useMap } from "react-leaflet";
import { useState } from "react";

const LocateButton = ({
  setPosition,
}: {
  setPosition: (pos: [number, number]) => void;
}) => {
  const map = useMap();
  const [loading, setLoading] = useState<boolean>(false);
  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند!");
      return;
    }
    setLoading(true),
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]); // تنظیم موقعیت جدید
          map.setView([latitude, longitude], map.getZoom()); // تغییر مرکز نقشه
          setLoading(false);
        },
        () => {
          setLoading(false);
          toast.error("Fail to find position!", {
            position: "top-center",
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
  };

  return (
    <>
      <Button
        onClick={locateUser}
        isLoading={loading}
        className="ownstyle absolute bottom-3 left-4  bg-[#499276] hover:bg-[#2d6a4f] text-white p-3 rounded-full shadow-md  transition-all duration-300 flex items-center justify-center z-[1000]"
      >
        <FaCrosshairs className="text-gray-200 text-xl" />
      </Button>
      <ToastContainer className="absolute text-[15px]" />
    </>
  );
};

export default LocateButton;