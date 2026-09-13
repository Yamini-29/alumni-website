"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, Images, CalendarDays } from "lucide-react";

import SectionHero from "@/components/public/SectionHero";

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

        const res = await fetch("/api/public/gallery?limit=24");

        if (!res.ok) throw new Error();

        setResult(await res.json());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    if (!q) return result.items;

    return result.items.filter((folder) =>
      folder.eventName.toLowerCase().includes(q)
    );
  }, [result.items, search]);

  return (
    <div className="min-h-screen bg-[#F7F4ED]">
      <SectionHero
        label="MEMORIES & MOMENTS"
        title="Relive Every Celebration"
                description="Explore photographs from reunions, graduations, cultural festivals and unforgettable moments shared by the Thamarai International School alumni community."

        showLogo
      />

      <main className="mx-auto max-w-7xl px-6 pb-20">
        {/* Search Panel */}
        <section className="-mt-10 mb-14 relative z-20">
            {/* <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-5 py-4">
              <Search className="text-slate-400" size={20} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search albums by event name..."
                className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div> */}

            {/* <div className="mt-5 flex items-center justify-between text-sm">
              <p className="text-slate-500">
                {filtered.length} album{filtered.length !== 1 && "s"} available
              </p> */}

              {/* <div className="flex items-center gap-2 text-[#183B7A] font-medium">
                <Images size={18} />
                Alumni Gallery
              </div> */}
        </section>

        {/* Section Heading */}
        <section className="mb-10 text-center">
        

          <h2 className="mt-3 text-4xl font-bold text-[#12233D]">
            Featured Event Albums
          </h2>

         
        </section>

        {/* Loading */}
        {loading && (
          <div className="rounded-3xl border border-[#E8E2D6] bg-white py-20 text-center">
            <Images
              className="mx-auto mb-4 text-[#183B7A]/40"
              size={42}
            />
            <p className="text-slate-500">Loading gallery...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-100 bg-white py-20 text-center">
            <h3 className="text-2xl font-bold text-[#12233D]">
              Unable to load gallery
            </h3>

            <p className="mt-3 text-slate-500">
              Please try again in a few moments.
            </p>
          </div>
        )}

        {/* Albums */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((folder) => {
              const cover =
                folder.coverImage || folder.photos[0]?.url;

              return (
                <Link
                  key={folder.id}
                  href={`/public/gallery/${folder.id}`}
                  className="group"
                >
                  <article className="overflow-hidden rounded-[28px] border border-[#E8E2D6] bg-white shadow-[0_18px_45px_rgba(24,59,122,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_28px_60px_rgba(24,59,122,0.14)]">
                    {/* Cover */}
                    <div className="relative h-64 overflow-hidden">
                      {cover ? (
                        <img
                          src={cover}
                          alt={folder.eventName}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#183B7A] text-6xl font-bold text-white">
                          {folder.eventName[0]}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#102548]/85 via-transparent to-transparent" />

                      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
                        <Images size={15} className="text-white" />
                        <span className="text-sm text-white">
                          {folder.photos.length} Photos
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 p-6">
                      <div className="flex items-center gap-2 text-sm text-[#82690D] font-semibold">
                        <CalendarDays size={15} />
                        {folder.eventDate}
                      </div>

                      <h3 className="text-2xl font-bold leading-tight text-[#183B7A] group-hover:text-[#2E56A6] transition">
                        {folder.eventName}
                      </h3>

                      <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                        {folder.description}
                      </p>

                      <div className="border-t border-slate-100 pt-4">
                        <span className="font-semibold text-[#183B7A] group-hover:text-[#D8A11C] transition">
                          View Album →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-3xl border border-[#E8E2D6] bg-white py-20 text-center">
            <Images
              className="mx-auto mb-5 text-[#183B7A]/30"
              size={48}
            />

            <h3 className="text-2xl font-bold text-[#12233D]">
              No albums found
            </h3>

            <p className="mt-3 text-slate-500">
              Try searching with a different event name.
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-6 rounded-xl bg-[#183B7A] px-6 py-3 font-semibold text-white hover:bg-[#122E61]"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}