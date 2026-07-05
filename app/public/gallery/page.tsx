"use client";

import { useMemo, useState } from "react";
import { FolderPlus } from "lucide-react";

import galleryData from "@/data/gallery.json";
import { GalleryFolder } from "@/types/gallery";

import FolderCard from "@/components/admin/gallery/FolderCard";
import FolderModal from "@/components/admin/gallery/FolderModal";
import DeleteFolderModal from "@/components/admin/gallery/DeleteFolderModal";

export default function GalleryPage() {
  const [folders, setFolders] = useState<GalleryFolder[]>(
    galleryData as GalleryFolder[]
  );

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedFolder, setSelectedFolder] =
    useState<GalleryFolder | null>(null);

  const filteredFolders = useMemo(() => {
    return folders.filter((folder) =>
      folder.eventName.toLowerCase().includes(search.toLowerCase())
    );
  }, [folders, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Gallery Management
          </h1>

          <p className="mt-2 text-lg text-gray-700">
            Organize school memories into event folders.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedFolder(null);
            setShowModal(true);
          }}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#303F9F]
            px-6
            py-3
            font-semibold
            text-white
            shadow-md
            transition
            hover:bg-[#283593]
          "
        >
          <FolderPlus size={18} />
          New Folder
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by event name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-5
            py-4
            text-gray-900
            shadow-sm
            outline-none
            transition
            focus:border-[#303F9F]
          "
        />
      </div>

      {/* Folder Grid */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {filteredFolders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onEdit={(f) => {
              setSelectedFolder(f);
              setShowModal(true);
            }}
            onDelete={(f) => {
              setSelectedFolder(f);
              setShowDeleteModal(true);
            }}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredFolders.length === 0 && (
        <div className="mt-16 rounded-2xl bg-white py-16 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            No Folders Found
          </h2>

          <p className="mt-3 text-gray-600">
            Try a different search, or create a new event folder.
          </p>

          <button
            onClick={() => {
              setSelectedFolder(null);
              setShowModal(true);
            }}
            className="
              mt-6
              rounded-xl
              bg-[#303F9F]
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#283593]
            "
          >
            + New Folder
          </button>
        </div>
      )}

      {/* Add / Edit Folder Modal */}
      {showModal && (
        <FolderModal
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          mode={selectedFolder ? "edit" : "add"}
          closeModal={() => {
            setShowModal(false);
            setSelectedFolder(null);
          }}
        />
      )}

      {/* Delete Folder Modal */}
      {showDeleteModal && selectedFolder && (
        <DeleteFolderModal
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          closeModal={() => {
            setShowDeleteModal(false);
            setSelectedFolder(null);
          }}
        />
      )}
    </div>
  );
}