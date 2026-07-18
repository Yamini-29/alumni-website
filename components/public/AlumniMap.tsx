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
      return "#183B7A";

    case "NIT":
      return "#2E56A6";

    case "AIIMS":
      return "#D8A11C";

    default:
      return "#94A3B8";
  }
};

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-slate-50 px-3 py-2">

      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />

      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

    </div>
  );
}

export default function AlumniMap() {
  return (
    <section className="relative overflow-hidden py-20 bg-white ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

    <div
        className="
        absolute
        -left-40
        top-20
        h-[420px]
        w-[420px]
        rounded-full
        bg-[#183B7A]/5
        blur-[120px]
        "
    />

    <div
        className="
        absolute
        -right-32
        bottom-0
        h-[380px]
        w-[380px]
        rounded-full
        bg-[#D8A11C]/8
        blur-[120px]
        "
    />

</div>  
<div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D8A11C]">
          Alumni Network
        </p>

        <h2 className="mt-3 text-4xl font-bold text-[#12233D]">
          Explore Our Alumni Presence
        </h2>

        <p className="mt-4 max-w-5xl text-lg leading-8 text-slate-600">
          Our alumni continue to pursue excellence across India's premier
          institutions, strengthening a nationwide network of learning,
          leadership and lifelong connections.
        </p>
      </div>
    <div className="overflow-hidden rounded-[36px] border border-slate-200 mt-10 bg-white shadow-[0_24px_60px_rgba(24,59,122,.10)]">


      {/* 🔥 MAIN FLEX */}
      <div className="relative">

        {/* 🗺️ MAP */}
        <div className="relative flex-1 h-[700px] overflow-hidden">
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
                  fillOpacity: 0.95,
                  weight:2
                }}
              >
                <Popup>

                  <div className="min-w-[180px]">

                    <h3 className="font-bold text-[#183B7A]">

                      {d.name}

                    </h3>

                    <p className="mt-2 text-slate-600">

                      {d.college}

                    </p>

                  </div>

                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
          <div className="relative z-10">
          {/* Floating Legend */}

            <div
              className="
              absolute
              bottom-8
              right-8
              z-[1000]
              rounded-3xl
              border
              border-slate-200
              bg-white/95
              backdrop-blur-xl
              shadow-xl
              p-5
              "
              >

              <h3 className="mb-4 font-semibold text-[#183B7A]">
                Legend
              </h3>

              <div className="space-y-3">

                <Legend color="#183B7A" label="IIT" />

                <Legend color="#2E56A6" label="NIT" />

                <Legend color="#D8A11C" label="AIIMS" />

                <Legend color="#94A3B8" label="Others" />

              </div>

            </div>
            </div>
        </div>

        {/* 📌 LEGEND (NOW CORRECT POSITION) */}
        

      </div>
    </div>
    </section>
    
  );
}