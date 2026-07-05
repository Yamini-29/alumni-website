"use client";

import { AlertTriangle } from "lucide-react";
import { GalleryFolder } from "@/types/gallery";

interface Props {
  folders: GalleryFolder[];
  setFolders: React.Dispatch<React.SetStateAction<GalleryFolder[]>>;
  selectedFolder: GalleryFolder;
  closeModal: () => void;
}

export default function DeleteFolderModal({
  folders,
  setFolders,
  selectedFolder,
  closeModal,
}: Props) {
  const handleDelete = () => {
    setFolders(
      folders.filter((folder) => folder.id !== selectedFolder.id)
    );
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="text-red-600" size={28} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900">
          Delete Folder?
        </h2>

        <p className="mt-2 text-gray-700">
          You are about to delete{" "}
          <span className="font-semibold text-gray-900">
            {selectedFolder.eventName}
          </span>
          . This will permanently remove{" "}
          <span className="font-semibold text-gray-900">
            {selectedFolder.photos.length}{" "}
            {selectedFolder.photos.length === 1 ? "photo" : "photos"}
          </span>{" "}
          inside it. This action cannot be undone.
        </p>

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
            onClick={handleDelete}
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
            Delete Folder
          </button>
        </div>
      </div>
    </div>
  );
}