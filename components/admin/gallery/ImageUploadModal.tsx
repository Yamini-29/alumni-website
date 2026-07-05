"use client";

import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { GalleryFolder, GalleryPhoto } from "@/types/gallery";

interface Props {
  folder: GalleryFolder;
  onUpload: (newPhotos: GalleryPhoto[]) => void;
  closeModal: () => void;
}

interface PendingFile {
  file: File;
  previewUrl: string;
}

export default function ImageUploadModal({
  folder,
  onUpload,
  closeModal,
}: Props) {
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPending: PendingFile[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setPendingFiles((prev) => [...prev, ...newPending]);

    // allow re-selecting the same file(s) again later
    e.target.value = "";
  };

  const removePending = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (pendingFiles.length === 0) {
      alert("Please choose at least one image to upload.");
      return;
    }

    const newPhotos: GalleryPhoto[] = pendingFiles.map((pending, i) => ({
      id: `${folder.id}-${Date.now()}-${i}`,
      url: pending.previewUrl,
      uploadedDate: new Date().toISOString().split("T")[0],
    }));

    onUpload(newPhotos);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Upload Images
          </h2>
          <p className="mt-1 text-gray-700">
            Add new photos to{" "}
            <span className="font-semibold text-gray-900">
              {folder.eventName}
            </span>
            .
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFilesSelected}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-3
              rounded-2xl
              border-2
              border-dashed
              border-gray-300
              p-10
              text-center
              transition
              hover:border-[#303F9F]
              hover:bg-[#303F9F]/5
            "
          >
            <UploadCloud size={36} className="text-[#303F9F]" />
            <div>
              <p className="font-semibold text-gray-900">
                Click to choose images
              </p>
              <p className="mt-1 text-sm text-gray-600">
                You can select multiple photos from your device at once.
              </p>
            </div>
          </button>

          {pendingFiles.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-gray-700">
                {pendingFiles.length}{" "}
                {pendingFiles.length === 1 ? "image" : "images"} ready to
                upload
              </p>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {pendingFiles.map((pending, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl bg-gray-100"
                  >
                    <img
                      src={pending.previewUrl}
                      alt={pending.file.name}
                      className="h-24 w-full object-cover"
                    />

                    <button
                      onClick={() => removePending(index)}
                      className="
                        absolute
                        right-1.5
                        top-1.5
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-black/60
                        text-white
                        opacity-0
                        transition
                        group-hover:opacity-100
                      "
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 bg-white px-8 py-5">
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
            onClick={handleUpload}
            className="
              rounded-lg
              bg-[#303F9F]
              px-6
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-[#283593]
            "
          >
            Upload{" "}
            {pendingFiles.length > 0 ? `(${pendingFiles.length})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}