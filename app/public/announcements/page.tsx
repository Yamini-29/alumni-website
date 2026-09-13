"use client";

import { Bell, CalendarDays, Pin } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHero from "@/components/public/SectionHero";

type Announcement = {
  id: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  pinned: boolean;
};

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/announcements")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3EE]">
      <SectionHero
        label="SCHOOL UPDATES"
        title="Announcements & Notices"
        description="Stay informed with the latest news, opportunities, alumni initiatives and important updates from Thamarai International School."
        showLogo
      />

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {/* Section Heading */}
        <section className="py-8 text-center">
         

          <h2 className="mt-3 text-4xl font-bold text-[#12233D]">
            Latest Announcements
          </h2>

        
        </section>

        {/* Loading */}
        {loading && (
          <div className="rounded-[28px] border border-slate-200 bg-white/70 p-16 text-center">
            <p className="text-slate-500">Loading announcements...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && items.length === 0 && (
          <div className="rounded-[28px] border border-slate-200 bg-white p-16 text-center shadow-sm">
            <Bell
              className="mx-auto mb-5 text-[#183B7A]/30"
              size={48}
            />

            <h3 className="text-2xl font-bold text-[#183B7A]">
              No announcements yet
            </h3>

            <p className="mt-3 text-slate-600">
              New announcements from the school will appear here.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading && items.length > 0 && (
          <div className="space-y-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_rgba(24,59,122,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(24,59,122,0.14)]"
              >
                {/* Gold accent */}
                <div className="absolute left-0 top-8 h-16 w-1 rounded-r-full bg-[#D8A11C]" />

                <div className="pl-4">
                  {/* Top Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#183B7A]/8 px-4 py-1.5 text-sm font-semibold text-[#183B7A]">
                        {item.category}
                      </span>

                      {item.pinned && (
                        <span className="flex items-center gap-1 rounded-full bg-[#D8A11C]/15 px-3 py-1 text-sm font-semibold text-[#9A7300]">
                          <Pin size={14} />
                          Pinned
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays size={16} />
                      {item.publishDate}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="mt-5 text-3xl font-bold leading-tight text-[#12233D] transition group-hover:text-[#183B7A]">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-5 text-[17px] leading-8 text-slate-600">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-medium text-[#183B7A]">
                    <Bell size={16} />
                    Official School Announcement
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}