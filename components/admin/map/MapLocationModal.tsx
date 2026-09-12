"use client";

import { useState } from "react";
import { MapLocation, CollegeType } from "@/types/map";

interface Props {
  selectedLocation?: MapLocation | null;

  mode: "add" | "edit";

  closeModal: () => void;

  onSuccess: () => Promise<void>;
}

export default function MapLocationModal({
  selectedLocation,
  mode,
  closeModal,
  onSuccess,
}: Props) {
  const [name, setName] = useState(selectedLocation?.name || "");
  const [college, setCollege] = useState(selectedLocation?.college || "");
  const [city, setCity] = useState(selectedLocation?.city || "");

  const [type, setType] = useState<CollegeType>(
    selectedLocation?.type || "OTHER"
  );

  const [latitude, setLatitude] = useState(
    selectedLocation?.latitude || 0
  );

  const [longitude, setLongitude] = useState(
    selectedLocation?.longitude || 0
  );
  const [loadingCoordinates, setLoadingCoordinates] = useState(false);
  const getCoordinates = async () => {
  if (!college || !city) {
    alert("Enter college and city first");
    return;
  }

  try {
    setLoadingCoordinates(true);

    const response = await fetch("/api/admin/map/geocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        college,
        city,
      }),
    });

    if (!response.ok) {
      alert("Unable to find coordinates");
      return;
    }

    const data = await response.json();

    setLatitude(data.latitude);
    setLongitude(data.longitude);
  } catch (error) {
    console.error(error);
    alert("Failed to fetch coordinates");
  } finally {
    setLoadingCoordinates(false);
  }
};

  const handleSubmit = async () => {
    const payload = {
      name,
      college,
      city,
      type,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    if (mode === "add") {
      await fetch("/api/admin/map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`/api/admin/map/${selectedLocation?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    await onSuccess();

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[650px] p-8">

        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {mode === "add" ? "Add Location" : "Edit Location"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as CollegeType)}
            className="border rounded-lg p-3"
          >
            <option value="IIT">IIT</option>
            <option value="NIT">NIT</option>
            <option value="AIIMS">AIIMS</option>
            <option value="OTHER">OTHER</option>
          </select>

          <input
            placeholder="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="border rounded-lg p-3 col-span-2"
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded-lg p-3 col-span-2"
          />

          <div className="col-span-2">
  <div className="flex justify-between items-center mb-2">
    <label className="font-medium text-gray-700">
      Map Coordinates
    </label>

    <button
      type="button"
      onClick={getCoordinates}
      disabled={loadingCoordinates}
      className="bg-[#D89B06] text-white px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
    >
      {loadingCoordinates
        ? "Finding..."
        : "Get Coordinates"}
    </button>
  </div>

  <div className="grid grid-cols-2 gap-3">
    <input
      type="number"
      step="0.000001"
      value={latitude}
      onChange={(e) =>
        setLatitude(Number(e.target.value))
      }
      placeholder="Latitude"
      className="border rounded-lg p-3"
    />

    <input
      type="number"
      step="0.000001"
      value={longitude}
      onChange={(e) =>
        setLongitude(Number(e.target.value))
      }
      placeholder="Longitude"
      className="border rounded-lg p-3"
    />
  </div>

  <p className="text-sm text-gray-500 mt-2">
    Auto-fill using College + City, or edit manually.
  </p>
</div>
        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={closeModal}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#303F9F] text-white px-5 py-2 rounded-lg"
          >
            {mode === "add" ? "Save Location" : "Update Location"}
          </button>

        </div>

      </div>

    </div>
  );
}