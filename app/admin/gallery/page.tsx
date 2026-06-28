"use client";

import { useMemo, useState } from "react";

import galleryData from "@/data/gallery.json";
import { GalleryImage } from "@/types/gallery";

import GalleryModal from "@/components/admin/gallery/GalleryModal";
import GalleryDrawer from "@/components/admin/gallery/GalleryDrawer";
import DeleteGalleryModal from "@/components/admin/gallery/DeleteGalleryModal";

export default function GalleryPage() {
  const [gallery, setGallery] =
    useState<GalleryImage[]>(galleryData);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const filteredGallery = useMemo(() => {
    return gallery.filter((image) => {
      return (
        image.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        image.event
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        image.category
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [gallery, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Gallery Management
          </h1>

          <p className="mt-2 text-lg text-gray-700">
            Manage school memories and event photographs.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedImage(null);
            setShowModal(true);
          }}
          className="
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
          + Add Image
        </button>

      </div>

      {/* Search */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search by title, event or category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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

      {/* Gallery Grid */}

      <div
  className="
    grid
    gap-6
    md:grid-cols-2
    xl:grid-cols-3
  "
>
        {filteredGallery.map((image) => (

          <div
            key={image.id}
            className="
              group
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            <div className="relative">

              <img
                src={image.image}
                alt={image.title}
                className="
    h-52
    w-full
    object-cover
    transition
    duration-300
    group-hover:scale-105
  "
              />

              {image.featured && (

                <span
                  className="
                    absolute
                    left-3
                    top-3
                    rounded-full
                    bg-[#C218D4]
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  Featured
                </span>

              )}

              {/* Hover Overlay */}

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
                  onClick={() => {
                    setSelectedImage(image);
                    setShowDrawer(true);
                  }}
                  className="
                    rounded-lg
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-gray-900
                  "
                >
                  View
                </button>

                <button
                  onClick={() => {
                    setSelectedImage(image);
                    setShowModal(true);
                  }}
                  className="
                    rounded-lg
                    bg-[#303F9F]
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedImage(image);
                    setShowDeleteModal(true);
                  }}
                  className="
                    rounded-lg
                    bg-red-600
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Delete
                </button>

              </div>

            </div>

            <div className="space-y-2 p-5">

              <h2 className="truncate text-lg font-bold text-gray-900">
                {image.title}
              </h2>

              <p className="text-sm text-gray-600">
                {image.event}
              </p>

              <span
                className="
                  inline-block
                  rounded-full
                  bg-[#303F9F]/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-[#303F9F]
                "
              >
                {image.category}
              </span>

            </div>

          </div>

        ))}
              </div>

      {/* Empty State */}

      {filteredGallery.length === 0 && (
        <div className="mt-16 rounded-2xl bg-white py-16 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            No Images Found
          </h2>

          <p className="mt-3 text-gray-600">
            Try searching with another keyword or upload a new image.
          </p>

          <button
            onClick={() => {
              setSelectedImage(null);
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
            + Upload Image
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}

      {showModal && (
        <GalleryModal
          gallery={gallery}
          setGallery={setGallery}
          selectedImage={selectedImage}
          mode={selectedImage ? "edit" : "add"}
          closeModal={() => {
            setShowModal(false);
            setSelectedImage(null);
          }}
        />
      )}

      {/* View Drawer */}

      {showDrawer && selectedImage && (
        <GalleryDrawer
          image={selectedImage}
          closeDrawer={() => {
            setShowDrawer(false);
            setSelectedImage(null);
          }}
        />
      )}

      {/* Delete Modal */}

      {showDeleteModal && selectedImage && (
        <DeleteGalleryModal
          gallery={gallery}
          setGallery={setGallery}
          selectedImage={selectedImage}
          closeModal={() => {
            setShowDeleteModal(false);
            setSelectedImage(null);
          }}
        />
      )}
    </div>
  );
}