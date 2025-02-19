"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import LocateButton from "./map/LocateButton";
import { locationPositionType } from "@/types/myTypes";
import dynamic from "next/dynamic";
import addressFinder from "@/utils/addressFinder";

const AddAddressForm = dynamic(() => import("./map/AddAddressForm"), {
  ssr: false,
});

export default function GoogleMapWithLeaflet() {
  const [mapCenter, setMapCenter] = useState<locationPositionType>([
    35.6892, 51.389,
  ]);
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // 🚀 اضافه شدن استیت برای کنترل سایه

  // دریافت آدرس بر اساس مرکز نقشه
  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const response = await addressFinder(mapCenter[0], mapCenter[1]);
        setUserAddress(response);
      } catch (error) {
        console.error("Failed to fetch address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [mapCenter]);

  return (
    <div className="max-w-3xl mx-auto md:p-4 space-y-4">
      {/* نقشه */}
      <div className="relative">
        <MapContainer
          center={mapCenter}
          zoom={12}
          className="h-[400px] md:h-[500px] w-full mt-10 rounded-lg shadow-lg overflow-hidden z-0 relative border"
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />

          {/* کنترل تغییر مرکز نقشه */}
          <MapEventsHandler
            setMapCenter={setMapCenter}
            setIsMoving={setIsMoving}
          />

          {/* مارکر در مرکز نقشه */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none transition-all  ${
              isMoving
                ? "shadow-2xl scale-110 translate-y-[-20px]"
                : "shadow-none"
            }`}
          >
            <img
              src="/location-pin.png"
              alt="marker"
              className="w-[35px] h-[35px]"
            />
          </div>

          <LocateButton setMapCenter={setMapCenter} />
        </MapContainer>
      </div>

      {/* فرم آدرس */}
      <AddAddressForm
        key={userAddress}
        defaulValue={userAddress}
        loading={loading}
      />
    </div>
  );
}

// ** کنترل رویدادهای نقشه **
function MapEventsHandler({
  setMapCenter,
  setIsMoving,
}: {
  setMapCenter: (pos: locationPositionType) => void;
  setIsMoving: (moving: boolean) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const onMoveStart = () => setIsMoving(true);
    const onMoveEnd = () => {
      setIsMoving(false);
      const newCenter = map.getCenter();
      setMapCenter([newCenter.lat, newCenter.lng]);
    };

    map.on("movestart", onMoveStart);
    map.on("moveend", onMoveEnd);

    return () => {
      map.off("movestart", onMoveStart);
      map.off("moveend", onMoveEnd);
    };
  }, [map, setMapCenter, setIsMoving]);

  return null;
}
