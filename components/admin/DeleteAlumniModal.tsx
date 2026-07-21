"use client";

import { Alumni } from "@/types/alumni";

interface Props {
  alumni: Alumni[];
  setAlumni: React.Dispatch<React.SetStateAction<Alumni[]>>;
  selectedAlumni: Alumni | null;
  closeModal: () => void;
  onSuccess: () => Promise<void>;
}

export default function DeleteAlumniModal({
  alumni,
  setAlumni,
  selectedAlumni,
  closeModal,
  onSuccess,
}: Props) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/admin/alumni/${selectedAlumni?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Failed to delete alumni");
        return;
      }

      await onSuccess();
      closeModal();
    } catch (error) {
      console.error("Error deleting alumni:", error);
      alert("An error occurred while deleting the alumni");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[500px] shadow-2xl">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Alumni
        </h2>

        <p className="text-gray-700 mt-4">
          Are you sure you want to delete:
        </p>

        <p className="font-semibold text-gray-900 mt-2">
          {selectedAlumni?.name}
        </p>

        <p className="text-sm text-gray-500 mt-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={closeModal}
            className="
              px-4
              py-2
              border
              rounded-lg
              text-gray-700
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="
              px-4
              py-2
              bg-red-600
              text-white
              rounded-lg
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}