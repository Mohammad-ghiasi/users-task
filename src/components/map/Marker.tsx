import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/location-pin.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

export default customIcon;
