"use client";

import { MapLocation } from "@/types/map";

interface Props {
  selectedLocation: MapLocation;

  closeModal: () => void;

  onSuccess: () => Promise<void>;
}

export default function DeleteLocationModal({
  selectedLocation,
  closeModal,
  onSuccess,
}: Props) {
  const handleDelete = async () => {
    await fetch(`/api/admin/map/${selectedLocation.id}`, {
      method: "DELETE",
    });

    await onSuccess();

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[480px] p-8">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Location
        </h2>

        <p className="mt-4 text-gray-700">
          Are you sure you want to remove this alumni location?
        </p>

        <p className="mt-3 font-semibold text-gray-900">
          {selectedLocation.name}
        </p>

        <p className="text-gray-500">
          {selectedLocation.college}
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={closeModal}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}