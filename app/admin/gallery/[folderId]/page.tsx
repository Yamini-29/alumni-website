"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, ImagePlus, ImageOff } from "lucide-react";

import galleryData from "@/data/gallery.json";
import { GalleryFolder, GalleryPhoto } from "@/types/gallery";

import PhotoCard from "@/components/admin/gallery/PhotoCard";
import ImageUploadModal from "@/components/admin/gallery/ImageUploadModal";
import DeleteImageModal from "@/components/admin/gallery/DeleteImageModal";
import PhotoViewerDrawer from "@/components/admin/gallery/PhotoViewerDrawer";

export default function GalleryFolderPage() {
  const params = useParams<{ folderId: string }>();
  const router = useRouter();

  const [folders, setFolders] = useState<GalleryFolder[]>(
    galleryData as GalleryFolder[]
  );

  const folder = useMemo(
    () => folders.find((f) => f.id === params.folderId) || null,
    [folders, params.folderId]
  );

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewerDrawer, setShowViewerDrawer] = useState(false);

  const [selectedPhoto, setSelectedPhoto] =
    useState<GalleryPhoto | null>(null);

  const updateFolderPhotos = (
    folderId: string,
    updater: (photos: GalleryPhoto[]) => GalleryPhoto[]
  ) => {
    setFolders((prev) =>
      prev.map((f) =>
        f.id === folderId ? { ...f, photos: updater(f.photos) } : f
      )
    );
  };

  const handleUpload = (newPhotos: GalleryPhoto[]) => {
    if (!folder) return;
    updateFolderPhotos(folder.id, (photos) => [...photos, ...newPhotos]);
  };

  const handleReplace = (photo: GalleryPhoto, newUrl: string) => {
    if (!folder) return;
    updateFolderPhotos(folder.id, (photos) =>
      photos.map((p) => (p.id === photo.id ? { ...p, url: newUrl } : p))
    );
  };

  const handleDeleteConfirmed = (photo: GalleryPhoto) => {
    if (!folder) return;
    updateFolderPhotos(folder.id, (photos) =>
      photos.filter((p) => p.id !== photo.id)
    );
  };

  if (!folder) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-center">
        <ImageOff size={48} className="text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Folder Not Found
        </h1>
        <p className="mt-2 text-gray-600">
          This gallery folder does not exist or may have been deleted.
        </p>
        <button
          onClick={() => router.push("/admin/gallery")}
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
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
        <button
          onClick={() => router.push("/admin/gallery")}
          className="font-medium text-[#303F9F] transition hover:underline"
        >
          Gallery
        </button>
        <ChevronRight size={14} className="text-gray-600" />
        <span className="font-medium text-gray-900">
          {folder.eventName}
        </span>
      </div>

      {/* Folder Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {folder.eventName}
          </h1>

          {folder.description && (
            <p className="mt-2 max-w-2xl text-gray-700">
              {folder.description}
            </p>
          )}

          <p className="mt-2 text-sm text-gray-600">
            {folder.photos.length}{" "}
            {folder.photos.length === 1 ? "photo" : "photos"}
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="
            flex
            items-center
            gap-2
            self-start
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
          <ImagePlus size={18} />
          Upload Images
        </button>
      </div>

      {/* Photo Masonry Grid */}
      {folder.photos.length > 0 ? (
        <div className="columns-2 gap-4 sm:columns-3 xl:columns-4">
          {folder.photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onView={(p) => {
                setSelectedPhoto(p);
                setShowViewerDrawer(true);
              }}
              onReplace={handleReplace}
              onDelete={(p) => {
                setSelectedPhoto(p);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-white py-16 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            No Photos Yet
          </h2>
          <p className="mt-3 text-gray-600">
            Upload the first photos for {folder.eventName}.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
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
            + Upload Images
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <ImageUploadModal
          folder={folder}
          onUpload={handleUpload}
          closeModal={() => setShowUploadModal(false)}
        />
      )}

      {/* Delete Photo Modal */}
      {showDeleteModal && selectedPhoto && (
        <DeleteImageModal
          photo={selectedPhoto}
          onConfirm={handleDeleteConfirmed}
          closeModal={() => {
            setShowDeleteModal(false);
            setSelectedPhoto(null);
          }}
        />
      )}

      {/* View Photo Drawer */}
      {showViewerDrawer && selectedPhoto && (
        <PhotoViewerDrawer
          photo={selectedPhoto}
          closeDrawer={() => {
            setShowViewerDrawer(false);
            setSelectedPhoto(null);
          }}
        />
      )}
    </div>
  );
}