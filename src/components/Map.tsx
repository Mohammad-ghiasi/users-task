"use client";

import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Button from "./UI/Button";
import { FaCrosshairs } from "react-icons/fa";
import { useState } from "react";

export type LocationFormType = {
  location: string;
};



const customIcon = new L.Icon({
  iconUrl: "/location-pin.png", // مسیر عکس مارکر (درون پوشه public)
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

export default function GoogleMapWithLeaflet() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LocationFormType>();
  const [userLocation, setUserLocation] = useState<[number, number]>([35.6892, 51.389]); // default tehran
  const [loading, setLoading] = useState<boolean>(false);
//   const map = useMap();


  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند!");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setLoading(false);
      },
      () => {
        alert("نمی‌توان موقعیت شما را دریافت کرد!");
        setLoading(false);
      }
    );
  };


  const onSubmit = async (data: LocationFormType) => {
    console.log("User Input:", data.location);
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {/* نقشه */}
      <div className="relative">
        <MapContainer
          center={userLocation}
          zoom={12}
          className="h-[500px] w-full mt-6 rounded-lg shadow-lg overflow-hidden z-0"
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <Marker position={userLocation} icon={customIcon} />
        </MapContainer>
        <button
          onClick={locateUser}
          className="absolute bottom-4 left-4 bg-white p-3 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-t-2 border-gray-600 rounded-full"></span>
          ) : (
            <FaCrosshairs className="text-gray-700 text-xl" />
          )}
        </button>
      </div>

      {/* فرم ورودی */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 "
      >
        <div className="flex flex-col">
          <input
            {...register("location", {
              required: "Location is required!",
              minLength: {
                value: 3,
                message: "At least 3 characters required!",
              },
              maxLength: { value: 50, message: "Too long!" },
            })}
            type="text"
            placeholder="Enter location..."
            className={`p-3 border rounded-lg focus:outline-none focus:ring-1 ${
              errors.location
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-500"
            } shadow`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
