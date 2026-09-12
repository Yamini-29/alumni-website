"use client";

import { useEffect, useMemo, useState } from "react";

type GalleryImage = { id: string; url: string };
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
        if (!response.ok) throw new Error("Unable to load gallery");
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
    return result.items.filter((folder) =>
      folder.eventName.toLowerCase().includes(search.toLowerCase())
    );
  }, [result.items, search]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20">
      <header className="relative overflow-hidden bg-[#183b7a] px-6 py-16 text-white md:px-10">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[34px] border-[#c218d4]/20" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8a11c]">
            Shared memories
          </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Photo gallery
          </h1>
          <p className="mt-4 max-w-xl text-slate-200">
            Explore memories from alumni events and school gatherings.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#183b7a]">Event albums</h2>
            <p className="mt-1 text-slate-600">Browse memories shared by the alumni community.</p>
          </div>
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
            focus:border-[#c218d4]
          "
        />
      </div>

      {loading ? (
        <p className="py-16 text-center text-slate-500">Loading gallery...</p>
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-white p-12 text-center text-red-600">
          We could not load the gallery right now. Please try again later.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredFolders.map((folder) => {
            const coverImage = folder.coverImage || folder.photos[0]?.url;
            return (
              <article
                key={folder.id}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_30px_rgba(24,59,122,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,59,122,0.14)]"
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={folder.eventName}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-[#183b7a] text-4xl font-bold text-white">
                    {folder.eventName.charAt(0)}
                  </div>
                )}
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3 text-sm text-[#82690d]">
                    <span>{folder.eventDate}</span>
                    <span>{folder.photos.length} photos</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#183b7a]">
                    {folder.eventName}
                  </h2>
                  {folder.description && (
                    <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                      {folder.description}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredFolders.length === 0 && (
        <div className="mt-16 rounded-2xl bg-white py-16 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#183b7a]">No albums found</h2>

          <p className="mt-3 text-gray-600">
            Try a different search.
          </p>
        </div>
      )}
      </main>
    </div>
  );
}