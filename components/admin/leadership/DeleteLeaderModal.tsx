"use client";

import { Leader } from "@/types/leadership";

interface Props {
  selectedLeader: Leader | null;

  closeModal: () => void;

  onSuccess: () => Promise<void>;
}

export default function DeleteLeaderModal({
  selectedLeader,
  closeModal,
  onSuccess,
}: Props) {
  const handleDelete = async () => {
    if (!selectedLeader) return;

    try {
      const response = await fetch(
        `/api/admin/leadership/${selectedLeader.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        alert("Failed to delete");
        return;
      }

      await onSuccess();

      closeModal();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[480px] rounded-2xl bg-white p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-red-600">
          Delete Leadership Member
        </h2>

        <p className="mt-4 text-gray-700">
          Are you sure you want to remove this leadership profile?
        </p>

        <div className="mt-5 rounded-xl bg-gray-50 p-4">
          <p className="font-semibold text-gray-900">
            {selectedLeader?.name}
          </p>

          <p className="text-gray-600">
            {selectedLeader?.designation}
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="rounded-lg border px-5 py-2 text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}