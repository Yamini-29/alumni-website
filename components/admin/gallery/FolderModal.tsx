"use client";

import { useRef, useState } from "react";
import { Folder as FolderIcon, Upload } from "lucide-react";
import { GalleryFolder } from "@/types/gallery";

interface Props {
  folders: GalleryFolder[];
  setFolders: React.Dispatch<React.SetStateAction<GalleryFolder[]>>;
  closeModal: () => void;

  mode: "add" | "edit";

  selectedFolder?: GalleryFolder | null;
}

export default function FolderModal({
  folders,
  setFolders,
  closeModal,
  mode,
  selectedFolder,
}: Props) {
  const [eventName, setEventName] = useState(
    selectedFolder?.eventName || ""
  );

  const [eventDate, setEventDate] = useState(
    selectedFolder?.eventDate || ""
  );

  const [description, setDescription] = useState(
    selectedFolder?.description || ""
  );

  const [coverImage, setCoverImage] = useState(
    selectedFolder?.coverImage || ""
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setCoverImage(objectUrl);
  };

  const handleSubmit = () => {
    if (!eventName || !eventDate || !coverImage) {
      alert("Please fill in Event Name, Event Date and Cover Image.");
      return;
    }

    if (mode === "add") {
      const newFolder: GalleryFolder = {
        id: `${eventName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        eventName,
        eventDate,
        description,
        coverImage,
        createdDate: new Date().toISOString().split("T")[0],
        photos: [],
      };

      setFolders([...folders, newFolder]);
    } else {
      setFolders(
        folders.map((folder) =>
          folder.id === selectedFolder?.id
            ? {
                ...folder,
                eventName,
                eventDate,
                description,
                coverImage,
              }
            : folder
        )
      );
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === "add" ? "New Gallery Folder" : "Edit Gallery Folder"}
          </h2>

          <p className="mt-1 text-gray-700">
            {mode === "add"
              ? "Create a folder for a school event to organize its photos."
              : "Update this event folder's details."}
          </p>
        </div>

        {/* Body */}
        <div className="grid flex-1 overflow-y-auto lg:grid-cols-5">
          {/* Live Preview */}
          <div className="border-r border-gray-200 bg-gray-50 p-6 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Live Preview
            </h3>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-48 w-full bg-gray-100">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-gray-300">
                    <FolderIcon size={48} />
                    <p className="mt-3 text-sm text-gray-500">
                      Cover image preview
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 p-5">
                <h3 className="text-lg font-bold text-gray-900">
                  {eventName || "Event Name"}
                </h3>
                <p className="text-sm text-gray-600">
                  {eventDate || "Event date"}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5 p-8 lg:col-span-3">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Farewell 2025"
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Cover Image
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleCoverFileChange}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-dashed
                  border-gray-300
                  p-4
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:border-[#303F9F]
                  hover:text-[#303F9F]
                "
              >
                <Upload size={16} />
                {coverImage ? "Replace Cover Image" : "Choose Cover Image"}
              </button>

              <p className="mt-2 text-xs text-gray-600">
                Pick an image from your computer to use as the folder cover.
              </p>
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short note about this event..."
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition focus:border-[#303F9F]"
              />
            </div>
          </div>
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
            onClick={handleSubmit}
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
            {mode === "add" ? "Save Folder" : "Update Folder"}
          </button>
        </div>
      </div>
    </div>
  );
}