"use client";

import { useRouter } from "next/navigation";
import { Folder, Image as ImageIcon, Pencil, Trash2 } from "lucide-react";
import { GalleryFolder } from "@/types/gallery";

interface Props {
  folder: GalleryFolder;
  onEdit: (folder: GalleryFolder) => void;
  onDelete: (folder: GalleryFolder) => void;
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

export default function FolderCard({ folder, onEdit, onDelete }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/admin/gallery/${folder.id}`)}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Cover Image */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        {folder.coverImage ? (
          <img
            src={folder.coverImage}
            alt={folder.eventName}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-300
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <ImageIcon size={48} />
          </div>
        )}

        {/* Folder icon badge */}
        <div
          className="
            absolute
            left-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-white/90
            shadow-sm
            backdrop-blur
          "
        >
          <Folder size={18} className="text-[#303F9F]" />
        </div>

        {/* Photo count badge */}
        <div
          className="
            absolute
            bottom-3
            right-3
            rounded-full
            bg-black/60
            px-3
            py-1
            text-xs
            font-semibold
            text-white
            backdrop-blur
          "
        >
          {folder.photos.length}{" "}
          {folder.photos.length === 1 ? "photo" : "photos"}
        </div>

        {/* Hover actions */}
        <div
          className="
            absolute
            inset-0
            flex
            items-start
            justify-end
            gap-2
            p-3
            opacity-0
            transition
            group-hover:opacity-100
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(folder);
            }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-white
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-100
            "
            title="Edit Folder"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(folder);
            }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-white
              text-red-600
              shadow-sm
              transition
              hover:bg-red-50
            "
            title="Delete Folder"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5 p-5">
        <h2 className="truncate text-lg font-bold text-gray-900">
          {folder.eventName}
        </h2>

        <p className="text-sm text-gray-600">
          Event date: {formatDate(folder.eventDate)}
        </p>

        <p className="text-xs text-gray-600">
          Created {formatDate(folder.createdDate)}
        </p>
      </div>
    </div>
  );
}