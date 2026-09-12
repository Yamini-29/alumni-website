"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type CollegeType = "IIT" | "NIT" | "AIIMS" | "OTHER";
type MapLocation = {
  id: string;
  name: string;
  college: string;
  city: string;
  type: CollegeType;
  latitude: number;
  longitude: number;
};

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
  count,
}: {
  color: string;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-full bg-slate-50 px-3 py-2">
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />

        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <span className="text-sm font-bold text-[#183B7A]">{count}</span>

    </div>
  );
}

export default function AlumniMap() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/public/map")
      .then((response) => {
        return response.json().then((payload) => {
          if (!response.ok) {
            throw new Error(payload.detail || payload.error || "Failed to load map locations");
          }
          return payload as MapLocation[];
        });
      })
      .then((data) => setLocations(data))
      .catch((failure: unknown) => {
        const message = failure instanceof Error ? failure.message : "Unknown map loading error";
        console.error("Public map request failed", failure);
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(
    () => ({
      IIT: locations.filter((location) => location.type === "IIT").length,
      NIT: locations.filter((location) => location.type === "NIT").length,
      AIIMS: locations.filter((location) => location.type === "AIIMS").length,
      OTHER: locations.filter((location) => location.type === "OTHER").length,
    }),
    [locations]
  );

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

            <MarkerClusterGroup
              chunkedLoading
              showCoverageOnHover={false}
              spiderfyOnMaxZoom
              iconCreateFunction={(cluster: { getChildCount: () => number }) =>
                L.divIcon({
                  html: `<span>${cluster.getChildCount()}</span>`,
                  className: "alumni-map-cluster",
                  iconSize: L.point(42, 42, true),
                })
              }
            >
              {locations.map((location) => (
                <CircleMarker
                  key={location.id}
                  center={[location.latitude, location.longitude]}
                  radius={8}
                  pathOptions={{
                    color: getColor(location.type),
                    fillOpacity: 0.95,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="min-w-[180px]">
                      <h3 className="font-bold text-[#183B7A]">
                        {location.name}
                      </h3>
                      <p className="mt-2 text-slate-600">
                        {location.college}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {location.city}
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
          {loading && (
            <div className="absolute inset-0 z-[900] flex items-center justify-center bg-white/45 backdrop-blur-[2px]">
              <p className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#183B7A] shadow-lg">
                Loading alumni locations...
              </p>
            </div>
          )}
          {error && !loading && (
            <div className="absolute inset-x-4 top-4 z-[1000] flex justify-center">
              <p className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-lg">
                Map unavailable: {error}
              </p>
            </div>
          )}
          <div className="absolute bottom-6 right-6 z-[1000] w-52 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:right-8">
            <h3 className="mb-3 font-semibold text-[#183B7A]">Legend</h3>
            <div className="space-y-2">
              <Legend color="#183B7A" label="IITs" count={counts.IIT} />
              <Legend color="#2E56A6" label="NITs" count={counts.NIT} />
              <Legend color="#D8A11C" label="AIIMS" count={counts.AIIMS} />
              <Legend color="#94A3B8" label="Others" count={counts.OTHER} />
            </div>
          </div>
        </div>

        {/* 📌 LEGEND (NOW CORRECT POSITION) */}
        

      </div>
    </div>
    </section>
    
  );
}