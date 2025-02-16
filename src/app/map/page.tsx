import dynamic from "next/dynamic";

// ⬅️ ایمپورت MapComponent فقط در کلاینت
const MapComponent = dynamic(() => import("../../components/Map"), { ssr: false });

export default function MapPage() {
  return (
    <div>
      <h1>Interactive Map</h1>
      <MapComponent />
    </div>
  );
}
