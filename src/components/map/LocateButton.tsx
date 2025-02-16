"use client";

import { useMap } from "react-leaflet";
import { FaCrosshairs } from "react-icons/fa";

interface LocateButtonProps {
  setPosition: (pos: [number, number]) => void;
}

const LocateButton = ({ setPosition }: LocateButtonProps) => {
  const map = useMap();

  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], map.getZoom());
      },
      () => {
        alert("نمی‌توان موقعیت شما را دریافت کرد!");
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <button
    onClick={locateUser}
    className="absolute bottom-4 left-4 bg-white p-3 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
  >
    {/* {loading ? (
      <span className="animate-spin h-5 w-5 border-t-2 border-gray-600 rounded-full"></span>
    ) : (
      <FaCrosshairs className="text-gray-700 text-xl" />
    )} */}
    <FaCrosshairs className="text-gray-700 text-xl" />
  </button>
  );
};

export default LocateButton;
