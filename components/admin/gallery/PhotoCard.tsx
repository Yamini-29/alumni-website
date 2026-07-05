"use client";

import { useRef } from "react";
import { Eye, RefreshCw, Trash2 } from "lucide-react";
import { GalleryPhoto } from "@/types/gallery";

interface Props {
  photo: GalleryPhoto;
  onView: (photo: GalleryPhoto) => void;
  onReplace: (photo: GalleryPhoto, newUrl: string) => void;
  onDelete: (photo: GalleryPhoto) => void;
}

export default function PhotoCard({
  photo,
  onView,
  onReplace,
  onDelete,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReplaceFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    onReplace(photo, objectUrl);

    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  };

  return (
    <div
      className="
        group
        relative
        mb-4
        break-inside-avoid
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
        transition
        hover:shadow-xl
      "
    >
      <img
        src={photo.url}
        alt="Gallery item"
        className="w-full object-cover"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleReplaceFileChange}
      />

      {/* Hover overlay */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          gap-3
          bg-black/50
          opacity-0
          transition
          group-hover:opacity-100
        "
      >
        <button
          onClick={() => onView(photo)}
          title="View"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-white
            text-gray-900
            transition
            hover:bg-gray-100
          "
        >
          <Eye size={18} />
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          title="Replace"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-[#303F9F]
            text-white
            transition
            hover:bg-[#283593]
          "
        >
          <RefreshCw size={18} />
        </button>

        <button
          onClick={() => onDelete(photo)}
          title="Delete"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-red-600
            text-white
            transition
            hover:bg-red-700
          "
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}