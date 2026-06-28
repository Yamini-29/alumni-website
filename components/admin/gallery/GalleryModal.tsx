"use client";

import { useState } from "react";
import { GalleryImage } from "@/types/gallery";
import { Image as ImageIcon } from "lucide-react";

interface Props {
  gallery: GalleryImage[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
  closeModal: () => void;

  mode: "add" | "edit";

  selectedImage?: GalleryImage | null;
}

export default function GalleryModal({
  gallery,
  setGallery,
  closeModal,
  mode,
  selectedImage,
}: Props) {
  const [title, setTitle] = useState(
    selectedImage?.title || ""
  );

  const [description, setDescription] = useState(
    selectedImage?.description || ""
  );

  const [category, setCategory] = useState(
    selectedImage?.category || ""
  );

  const [event, setEvent] = useState(
    selectedImage?.event || ""
  );

  const [image, setImage] = useState(
    selectedImage?.image || ""
  );

  const [featured, setFeatured] = useState(
    selectedImage?.featured || false
  );

  const handleSubmit = () => {
    if (
      !title ||
      !description ||
      !category ||
      !event ||
      !image
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (mode === "add") {
      const newImage: GalleryImage = {
        id: Date.now(),
        title,
        description,
        category,
        event,
        image,
        featured,
        uploadedBy: "Admin",
        uploadDate: new Date()
          .toISOString()
          .split("T")[0],
      };

      setGallery([...gallery, newImage]);
    } else {
      setGallery(
        gallery.map((item) =>
          item.id === selectedImage?.id
            ? {
                ...item,
                title,
                description,
                category,
                event,
                image,
                featured,
              }
            : item
        )
      );
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="border-b border-gray-200 px-8 py-6">

          <h2 className="text-3xl font-bold text-gray-900">
            {mode === "add"
              ? "Add Gallery Image"
              : "Edit Gallery Image"}
          </h2>

          <p className="mt-1 text-gray-700">
            {mode === "add"
              ? "Upload a new image to the school gallery."
              : "Update gallery information."}
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

              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-80 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-80 flex-col items-center justify-center text-gray-400">

                  <ImageIcon size={60} />

                  <p className="mt-4 text-sm">
                    Image preview will appear here
                  </p>

                </div>
              )}

              <div className="space-y-2 p-5">

                <h3 className="text-lg font-bold text-gray-900">
                  {title || "Image Title"}
                </h3>

                <p className="text-sm text-gray-600">
                  {event || "Event Name"}
                </p>

                <span className="inline-block rounded-full bg-[#303F9F]/10 px-3 py-1 text-xs font-semibold text-[#303F9F]">
                  {category || "Category"}
                </span>

                {featured && (
                  <div className="pt-2">
                    <span className="rounded-full bg-[#C218D4] px-3 py-1 text-xs font-semibold text-white">
                      Featured Image
                    </span>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Form */}

          <div className="space-y-5 p-8 lg:col-span-3">

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition focus:border-[#303F9F]"
              />
            </div>
                        <div className="grid grid-cols-2 gap-5">

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition focus:border-[#303F9F]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Event
                </label>

                <input
                  type="text"
                  value={event}
                  onChange={(e) =>
                    setEvent(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none transition focus:border-[#303F9F]"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Image URL
              </label>

              <input
    type="file"
    accept="image/*"
    hidden
/>

              <p className="mt-2 text-xs text-gray-500">
                Paste a public image URL. The preview updates instantly.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) =>
                    setFeatured(e.target.checked)
                  }
                  className="h-5 w-5 accent-[#303F9F]"
                />

                <div>
                  <p className="font-medium text-gray-900">
                    Featured Image
                  </p>

                  <p className="text-sm text-gray-500">
                    Display this image prominently in the alumni gallery.
                  </p>
                </div>

              </label>

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
            {mode === "add"
              ? "Save Image"
              : "Update Image"}
          </button>

        </div>

      </div>
    </div>
  );
}