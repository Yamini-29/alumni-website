"use client";

import { useEffect, useMemo, useState } from "react";
import { MapLocation } from "@/types/map";

import MapTable from "@/components/admin/map/MapTable";
import MapLocationModal from "@/components/admin/map/MapLocationModal";
import DeleteLocationModal from "@/components/admin/map/DeleteLocationModal";

export default function MapPage() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedLocation, setSelectedLocation] =
    useState<MapLocation | null>(null);

  async function fetchLocations() {
    const res = await fetch("/api/admin/map");
    const data = await res.json();
    setLocations(data);
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const keyword = search.toLowerCase();

      return (
        location.name.toLowerCase().includes(keyword) ||
        location.college.toLowerCase().includes(keyword) ||
        location.city.toLowerCase().includes(keyword)
      );
    });
  }, [locations, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Alumni Map Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage map locations displayed on the student portal.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedLocation(null);
            setShowModal(true);
          }}
          className="bg-[#303F9F] text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Location
        </button>

      </div>

      <div className="bg-white rounded-2xl shadow border p-5 mb-8">
        <input
          type="text"
          placeholder="Search student, college or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-4 text-gray-900 outline-none focus:ring-2 focus:ring-[#303F9F]"
        />
      </div>

      <MapTable
        locations={filteredLocations}
        setSelectedLocation={setSelectedLocation}
        setShowModal={setShowModal}
        setShowDelete={setShowDelete}
      />

      {showModal && (
        <MapLocationModal
          selectedLocation={selectedLocation}
          mode={selectedLocation ? "edit" : "add"}
          closeModal={() => setShowModal(false)}
          onSuccess={fetchLocations}
        />
      )}

      {showDelete && selectedLocation && (
        <DeleteLocationModal
          selectedLocation={selectedLocation}
          closeModal={() => setShowDelete(false)}
          onSuccess={fetchLocations}
        />
      )}

    </div>
  );
}