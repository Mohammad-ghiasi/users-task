"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import customIcon from "./map/Marker";
import LocateButton from "./map/LocateButton";
import { locationPositionType } from "@/types/myTypes";
// import AddAddressForm from "./map/AddAddressForm";
import addressFinder from "@/utils/addressFinder";
import dynamic from "next/dynamic";
const AddAddressForm = dynamic(() => import("./map/AddAddressForm"), { ssr: false });

// 📌 کامپوننتی برای دریافت کلیک روی نقشه
function ClickHandler({ setUserLocation }: { setUserLocation: (pos: locationPositionType) => void }) {
  useMapEvents({
    click(e) {
      setUserLocation([e.latlng.lat, e.latlng.lng]); // 📌 ذخیره مختصات جدید
    },
  });
  return null;
}

export default function GoogleMapWithLeaflet() {
  // موقعیت کاربر
  const [userLocation, setUserLocation] = useState<locationPositionType>([
    35.6892, 51.389,
  ]); // تهران
  // آدرس کاربر
  const [userAddress, setUserAddress] = useState("");
  // وضعیت لودینگ
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const response = await addressFinder(userLocation[0], userLocation[1]);
        setUserAddress(response);
      } catch (error) {
        console.error("Failed to fetch address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [userLocation]); // هر وقت `userLocation` تغییر کند، `userAddress` آپدیت می‌شود

  return (
    <div className="max-w-3xl mx-auto md:p-4 space-y-4">
      {/* نقشه */}
      <div className="relative">
        <MapContainer
          center={userLocation}
          zoom={12}
          className="h-[400px] md:h-[500px] w-full mt-10 rounded-lg shadow-lg overflow-hidden z-0 relative border"
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          {/* 📌 رویداد کلیک روی نقشه */}
          <ClickHandler setUserLocation={setUserLocation} />
          
          {/* 📌 مارکر در موقعیت انتخاب‌شده */}
          <Marker position={userLocation} icon={customIcon} />
          
          <LocateButton setPosition={setUserLocation} />
        </MapContainer>
      </div>

      {/* فرم ورودی */}
      <AddAddressForm key={userAddress} defaulValue={userAddress} loading={loading} />
    </div>
  );
}
