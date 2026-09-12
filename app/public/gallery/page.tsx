"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type GalleryImage = {
  id: string;
  url: string;
};

type GalleryFolder = {
  id: string;
  eventName: string;
  eventDate: string;
  coverImage: string;
  description: string;
  photos: GalleryImage[];
};

type GalleryResult = {
  items: GalleryFolder[];
  page: number;
  totalPages: number;
};

export default function GalleryPage() {
  const [result, setResult] = useState<GalleryResult>({
    items: [],
    page: 1,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch("/api/public/gallery?limit=24");

        if (!response.ok) {
          throw new Error("Unable to load gallery");
        }

        setResult(await response.json());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filteredFolders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return result.items;

    return result.items.filter((folder) =>
      folder.eventName.toLowerCase().includes(query)
    );
  }, [result.items, search]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16 pt-20">
      {/* Header */}
      <header className="relative overflow-hidden bg-[#183b7a] px-6 py-16 text-white md:px-10">
        {/* Decorative circle */}
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[34px] border-[#c218d4]/20" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8a11c]">
            Shared memories
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Photo gallery
          </h1>

          <p className="mt-4 max-w-xl text-slate-200">
            Explore memories from alumni events, reunions, and school
            gatherings.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#183b7a]">
            Event albums
          </h2>

          <p className="mt-1 text-slate-600">
            Browse memories shared by the alumni community.
          </p>
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
              border-slate-200
              bg-white
              px-5
              py-4
              text-slate-800
              shadow-sm
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-[#303F9F]
              focus:ring-2
              focus:ring-[#303F9F]/10
            "
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
            <p className="text-slate-500">Loading gallery...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-white p-12 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Unable to load gallery
            </h2>

            <p className="mt-2 text-slate-500">
              We could not load the gallery right now. Please try again later.
            </p>
          </div>
        )}

        {/* Gallery */}
        {!loading && !error && filteredFolders.length > 0 && (
          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
            "
          >
            {filteredFolders.map((folder) => {
              const coverImage =
                folder.coverImage || folder.photos[0]?.url || null;

              return (
                <Link
                  key={folder.id}
                  href={`/public/gallery/${folder.id}`}
                  className="group block"
                >
                  <article
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200/80
                      bg-white
                      shadow-[0_12px_30px_rgba(24,59,122,0.07)]
                      transition
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:shadow-[0_18px_40px_rgba(24,59,122,0.14)]
                    "
                  >
                    {/* Cover */}
                    <div className="relative overflow-hidden">
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt={folder.eventName}
                          className="
                            h-52
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-52
                            items-center
                            justify-center
                            bg-[#183b7a]
                            text-5xl
                            font-bold
                            text-white
                          "
                        >
                          {folder.eventName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      {/* Bottom gradient */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b1e3c]/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="space-y-3 p-5">
                      {/* Metadata */}
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium text-[#82690d]">
                          {folder.eventDate}
                        </span>

                        <span className="text-slate-500">
                          {folder.photos.length}{" "}
                          {folder.photos.length === 1
                            ? "photo"
                            : "photos"}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="
                          text-xl
                          font-bold
                          leading-tight
                          text-[#183b7a]
                          transition
                          group-hover:text-[#303F9F]
                        "
                      >
                        {folder.eventName}
                      </h2>

                      {/* Description */}
                      {folder.description && (
                        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                          {folder.description}
                        </p>
                      )}

                      {/* View album */}
                      <div className="border-t border-slate-100 pt-3">
                        <span className="text-sm font-semibold text-[#303F9F]">
                          View album →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredFolders.length === 0 && (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#183b7a]">
              No albums found
            </h2>

            <p className="mt-3 text-slate-600">
              {search
                ? "Try a different search."
                : "There are no gallery albums available yet."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
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
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}