"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Topbar from "@/components/admin/Topbar";
import StatsCard from "@/components/admin/StatsCard";

import {
  Users,
  CalendarDays,
  Image as ImageIcon,
  Megaphone,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    alumni: 0,
    events: 0,
    galleryImages: 0,
    announcements: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [alumniResponse, eventsResponse, galleryResponse, announcementsResponse] =
          await Promise.all([
            fetch("/api/admin/alumni"),
            fetch("/api/admin/events"),
            fetch("/api/admin/gallery"),
            fetch("/api/admin/announcements"),
          ]);

        if (
          !alumniResponse.ok ||
          !eventsResponse.ok ||
          !galleryResponse.ok ||
          !announcementsResponse.ok
        ) {
          throw new Error("Failed to fetch dashboard statistics");
        }

        const [alumni, events, folders, announcements] = await Promise.all([
          alumniResponse.json(),
          eventsResponse.json(),
          galleryResponse.json(),
          announcementsResponse.json(),
        ]);

        setStats({
          alumni: alumni.length,
          events: events.length,
          galleryImages: folders.reduce(
            (total: number, folder: { photos?: unknown[] }) =>
              total + (folder.photos?.length || 0),
            0
          ),
          announcements: announcements.length,
        });
      } catch (error) {
        console.error("Failed to load dashboard statistics", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Topbar />

      <div className="p-8">

        <div className="mb-8 flex items-center justify-between overflow-hidden rounded-2xl border border-[#E4DCCB] bg-[#FCFBF8] p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D89B06]">
              Alumni Administration
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#183B7A]">
              Welcome to Thamarai International School
            </h1>

            <p className="mt-2 max-w-2xl text-gray-600">
              Manage alumni records, events, announcements, gallery memories,
              and leadership content from one place.
            </p>
          </div>

          <div className="hidden rounded-full bg-white p-3 shadow-sm md:block">
            <Image
              src="/images/tis_logo.png"
              alt="Thamarai International School logo"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-gray-700">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 text-2xl text-gray-700">

          <StatsCard
            title="Total Alumni"
            value={isLoading ? "..." : stats.alumni.toLocaleString()}
            icon={<Users />}
          />

          <StatsCard
            title="Events"
            value={isLoading ? "..." : stats.events.toLocaleString()}
            icon={<CalendarDays />}
          />

          <StatsCard
            title="Gallery Images"
            value={isLoading ? "..." : stats.galleryImages.toLocaleString()}
            icon={<ImageIcon />}
          />

          <StatsCard
            title="Announcements"
            value={isLoading ? "..." : stats.announcements.toLocaleString()}
            icon={<Megaphone />}
          />

        </div>

      </div>
    </>
  );
}