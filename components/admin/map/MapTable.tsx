"use client";

import { MapLocation } from "@/types/map";

interface Props {
  locations: MapLocation[];

  setSelectedLocation: (location: MapLocation) => void;

  setShowModal: (value: boolean) => void;

  setShowDelete: (value: boolean) => void;
}

export default function MapTable({
  locations,
  setSelectedLocation,
  setShowModal,
  setShowDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">College</th>
            <th className="p-4 text-left">City</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Coordinates</th>
            <th className="p-4 text-left">Actions</th>
          </tr>

        </thead>

        <tbody>

          {locations.map((location) => (

            <tr
              key={location.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4 font-semibold text-gray-900">
                {location.name}
              </td>

              <td className="p-4">{location.college}</td>

              <td className="p-4">{location.city}</td>

              <td className="p-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {location.type}
                </span>
              </td>

              <td className="p-4 text-sm text-gray-600">
                {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowModal(true);
                    }}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowDelete(true);
                    }}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}