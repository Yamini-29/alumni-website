"use client";

import { X } from "lucide-react";
import { GalleryPhoto } from "@/types/gallery";

interface Props {
  photo: GalleryPhoto;
  closeDrawer: () => void;
}

function formatDate(dateString: string) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PhotoViewerDrawer({ photo, closeDrawer }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-lg flex-col overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">Photo Details</h2>

          <button
            onClick={closeDrawer}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-gray-600
              transition
              hover:bg-gray-100
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={photo.url}
              alt="Gallery photo"
              className="w-full object-cover"
            />
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm font-medium text-gray-600">
                Uploaded On
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {formatDate(photo.uploadedDate)}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3">
              <span className="text-sm font-medium text-gray-600">
                Photo ID
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {photo.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}