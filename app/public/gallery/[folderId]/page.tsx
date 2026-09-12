"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, ImageOff, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";

type GalleryPhoto = {
  id: string;
  url: string;
};

type GalleryFolder = {
  eventName: string;
  eventDate: string;
  description: string;
  photos: GalleryPhoto[];
};

export default function PublicGalleryFolderPage() {
  const params = useParams<{ folderId: string }>();

  const [folder, setFolder] = useState<GalleryFolder | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadFolder = async () => {
      try {
        const response = await fetch(
          `/api/public/gallery/${params.folderId}`
        );

        if (!response.ok) {
          setNotFound(true);
          return;
        }

        setFolder(await response.json());
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadFolder();
  }, [params.folderId]);

  const selectedPhoto =
    selectedIndex !== null && folder
      ? folder.photos[selectedIndex]
      : null;

  const closeViewer = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (!folder || selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? folder.photos.length - 1
        : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (!folder || selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === folder.photos.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, folder]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-slate-500">
        Loading album...
      </div>
    );
  }

  if (notFound || !folder) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-6 text-center">
        <ImageOff size={48} className="text-slate-300" />

        <h1 className="mt-4 text-2xl font-bold text-[#183b7a]">
          Album not found
        </h1>

        <p className="mt-2 max-w-md text-slate-600">
          This gallery folder does not exist or is no longer available.
        </p>

        <Link
          href="/public/gallery"
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
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16 pt-20">
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link
            href="/public/gallery"
            className="font-medium text-[#303F9F] transition hover:underline"
          >
            Gallery
          </Link>

          <ChevronRight size={14} className="text-slate-400" />

          <span className="font-medium text-slate-700">
            {folder.eventName}
          </span>
        </div>

        {/* Folder Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-bold text-[#183b7a] md:text-5xl">
              {folder.eventName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <span>{folder.eventDate}</span>

              <span className="text-slate-300">•</span>

              <span>
                {folder.photos.length}{" "}
                {folder.photos.length === 1 ? "photo" : "photos"}
              </span>
            </div>

            {folder.description && (
              <p className="mt-3 max-w-2xl leading-6 text-slate-600">
                {folder.description}
              </p>
            )}
          </div>

          <Link
            href="/public/gallery"
            className="
              self-start
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[#303F9F]
              shadow-sm
              transition
              hover:border-[#303F9F]
              hover:bg-slate-50
              sm:self-auto
            "
          >
            ← All Albums
          </Link>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-slate-200" />

        {/* Photos */}
        {folder.photos.length > 0 ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {folder.photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="
                  group
                  mb-5
                  block
                  w-full
                  break-inside-avoid
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  text-left
                  shadow-[0_12px_30px_rgba(24,59,122,0.08)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#303F9F]
                  focus:ring-offset-2
                "
              >
                <img
                  src={photo.url}
                  alt={`${folder.eventName} gallery photo ${index + 1}`}
                  className="
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
            <ImageOff
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-2xl font-bold text-[#183b7a]">
              No Photos Yet
            </h2>

            <p className="mt-2 text-slate-500">
              No photos are available in this album yet.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-[#071329]/95
            p-4
            md:p-8
          "
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photo viewer"
          onClick={closeViewer}
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={closeViewer}
            className="
              absolute
              right-4
              top-4
              z-10
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur
              transition
              hover:bg-white/20
            "
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <div
            className="
              absolute
              left-1/2
              top-5
              -translate-x-1/2
              rounded-full
              bg-white/10
              px-4
              py-2
              text-sm
              font-medium
              text-white
              backdrop-blur
            "
          >
            {(selectedIndex ?? 0) + 1} / {folder.photos.length}
          </div>

          {/* Previous */}
          {folder.photos.length > 1 && (
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="
                absolute
                left-3
                top-1/2
                z-10
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur
                transition
                hover:bg-white/20
                md:left-6
              "
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
          <img
            src={selectedPhoto.url}
            alt={`${folder.eventName} gallery photo`}
            className="
              max-h-[85vh]
              max-w-[calc(100vw-7rem)]
              rounded-xl
              object-contain
              shadow-2xl
              md:max-w-[85vw]
            "
            onClick={(event) => event.stopPropagation()}
          />

          {/* Next */}
          {folder.photos.length > 1 && (
            <button
              type="button"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="
                absolute
                right-3
                top-1/2
                z-10
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur
                transition
                hover:bg-white/20
                md:right-6
              "
            >
              <ChevronRightIcon size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}