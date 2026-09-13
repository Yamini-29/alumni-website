"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UpcomingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
};

const browseLinks = [
  { label: "Directory", href: "/public/directory" },
  { label: "Events", href: "/public/events" },
  { label: "Gallery", href: "/public/gallery" },
  { label: "Announcements", href: "/public/announcements" },
];

const alumniLocations = [
  ["6,932", "Bengaluru"],
  ["512", "Hyderabad"],
  ["359", "Chennai"],
];

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function Footer() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    fetch("/api/public/events?section=upcoming&limit=3")
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => setEvents(result?.items?.slice(0, 3) ?? []))
      .catch(() => setEvents([]));
  }, []);

  return (
    <footer className="mt-20 bg-[#0b1e3c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        {/* Main footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold text-white transition hover:text-[#C218D4]"
            >
              Thamarai International School
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
              Reconnect with your roots, celebrate achievements, and grow
              together through our alumni community.
            </p>

            {/* Small network summary
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {alumniLocations.map(([count, city]) => (
                <Link key={city} href="/public/clusters" className="group">
                  <span className="text-sm font-semibold text-white transition group-hover:text-[#C218D4]">
                    {count}
                  </span>{" "}
                  <span className="text-xs text-white/45">{city}</span>
                </Link>
              ))}
            </div> */}
          </div>

          {/* Browse */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Browse
            </h3>

            <nav aria-label="Footer navigation" className="space-y-2.5">
              {browseLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Upcoming events
            </h3>

            {events.length > 0 ? (
              <ul className="space-y-4">
                {events.map((event) => (
                  <li key={event.id}>
                    <Link href="/public/events" className="group block">
                      <span className="block text-sm font-medium text-white/80 transition group-hover:text-white">
                        {event.title}
                      </span>

                      <span className="mt-1 block text-xs text-white/40">
                        {formatEventDate(event.date)}
                        {event.time ? ` · ${event.time}` : ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/40">No upcoming events yet.</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Connect
            </h3>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@school.com"
                className="block text-white/65 transition hover:text-white"
              >
                info@school.com
              </a>

              <a
                href="tel:+919876543210"
                className="block text-white/65 transition hover:text-white"
              >
                +91 98765 43210
              </a>

              <Link
                href="/"
                className="block text-white/65 transition hover:text-white"
              >
                About the alumni network
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Thamarai International School Alumni</p>

          <p>Built for the alumni community</p>
        </div>
      </div>
    </footer>
  );
}
