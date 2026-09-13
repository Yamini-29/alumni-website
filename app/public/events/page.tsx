"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, Clock3, MapPin, Star } from "lucide-react";

import Pagination from "@/components/public/Pagination";
import SectionHero from "@/components/public/SectionHero";

type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  banner: string;
  featured: boolean;
};

type Result = {
  items: Event[];
  page: number;
  totalPages: number;
};

function EventCard({ event }: { event: Event }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(24,59,122,.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(24,59,122,.15)]">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={event.banner || "/images/school1.jpg"}
          alt={event.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#12233D]/80 via-transparent" />

        <div className="absolute left-5 top-5 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#183B7A] backdrop-blur">
            {event.category}
          </span>

          {event.featured && (
            <span className="flex items-center gap-1 rounded-full bg-[#D8A11C] px-3 py-1 text-xs font-semibold text-white">
              <Star size={12} fill="white" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <h3 className="text-2xl font-bold leading-tight text-[#183B7A]">
          {event.title}
        </h3>

        <p className="line-clamp-3 leading-7 text-slate-600">
          {event.description}
        </p>

        <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-[#D8A11C]" />
            {event.date}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} className="text-[#D8A11C]" />
            {event.time}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#D8A11C]" />
            {event.venue}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function EventsPage() {
  const [upcoming, setUpcoming] = useState<Result>({
    items: [],
    page: 1,
    totalPages: 1,
  });

  const [past, setPast] = useState<Result>({
    items: [],
    page: 1,
    totalPages: 1,
  });

  const [pastPage, setPastPage] = useState(1);

  useEffect(() => {
    fetch("/api/public/events?section=upcoming")
      .then((r) => r.json())
      .then(setUpcoming);
  }, []);

  useEffect(() => {
    fetch(`/api/public/events?section=past&page=${pastPage}`)
      .then((r) => r.json())
      .then(setPast);
  }, [pastPage]);

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <SectionHero
        label="ALUMNI EVENTS"
        title="Events, Reunions & Celebrations"
        description="Reconnect with classmates through reunions, networking evenings, sports meets and cultural celebrations hosted by the Thamarai International School Alumni Network."
        showLogo
      />

      <main className="relative mx-auto max-w-7xl px-6 pb-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-32 h-80 w-80 rounded-full bg-[#183B7A]/5 blur-[110px]" />
          <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-[#D8A11C]/10 blur-[100px]" />
        </div>

        {/* Upcoming */}
        <section className="relative -mt-2 mb-20">
          <div className="mb-10 text-center">
            

            <h2 className="mt-3 text-4xl font-bold text-[#12233D]">
              Upcoming Events
            </h2>

            
          </div>

          {upcoming.items.length ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {upcoming.items.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white py-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-[#183B7A]">
                No Upcoming Events
              </h3>

              <p className="mt-3 text-slate-500">
                Stay tuned—new alumni experiences will be announced soon.
              </p>
            </div>
          )}
        </section>

        {/* Past */}
        <section className="relative">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D8A11C]">
              Our Memories
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#12233D]">
              Past Events
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              A glimpse into unforgettable reunions, achievements and moments
              shared by our alumni family.
            </p>
          </div>

          {past.items.length ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {past.items.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Pagination
                  page={past.page}
                  totalPages={past.totalPages}
                  onPageChange={setPastPage}
                />
              </div>
            </>
          ) : (
            <div className="rounded-3xl bg-white py-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-[#183B7A]">
                No Past Events
              </h3>

              <p className="mt-3 text-slate-500">
                Event memories will appear here after they conclude.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}