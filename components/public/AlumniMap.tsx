"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import data from "@/data/mapData.json";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const getColor = (type: string) => {
  switch (type) {
    case "IIT":
      return "red";
    case "NIT":
      return "blue";
    case "AIIMS":
      return "green";
    default:
      return "orange";
  }
};

export default function AlumniMap() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold text-black mb-2">
        Alumni Across India
      </h2>

      <p className="text-sm text-black mb-4">
        Distribution of alumni across premier institutions in India
      </p>

      {/* 🔥 MAIN FLEX */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* 🗺️ MAP */}
        <div className="flex-1 h-[500px] rounded-xl overflow-hidden">
          <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map((d, i) => (
              <CircleMarker
                key={i}
                center={[d.lat, d.lng]}
                radius={8}
                pathOptions={{
                  color: getColor(d.type),
                  fillOpacity: 0.8,
                }}
              >
                <Popup>
                  <strong>{d.name}</strong> <br />
                  {d.college}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* 📌 LEGEND (NOW CORRECT POSITION) */}
        <div className="w-full md:w-[220px] bg-gray-50 rounded-xl p-4 shadow-sm">

          <h3 className="font-semibold mb-3 text-gray-700">
            Legend
          </h3>

          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              IIT
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
              NIT
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              AIIMS
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
              Other Colleges
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}