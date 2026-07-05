"use client";

import { AlertTriangle } from "lucide-react";
import { GalleryPhoto } from "@/types/gallery";

interface Props {
  photo: GalleryPhoto;
  onConfirm: (photo: GalleryPhoto) => void;
  closeModal: () => void;
}

export default function DeleteImageModal({
  photo,
  onConfirm,
  closeModal,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="text-red-600" size={28} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          Delete Photo?
        </h2>

        <p className="mt-2 text-gray-700">
          This photo will be permanently removed from the folder. This
          action cannot be undone.
        </p>

        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200">
          <img
            src={photo.url}
            alt="To delete"
            className="h-40 w-full object-cover"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="
              rounded-lg
              border
              border-gray-300
              px-6
              py-2.5
              font-medium
              text-gray-700
              transition
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm(photo);
              closeModal();
            }}
            className="
              rounded-lg
              bg-red-600
              px-6
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-red-700
            "
          >
            Delete Photo
          </button>
        </div>
      </div>
    </div>
  );
}