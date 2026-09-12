"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/admin/Topbar";
import StatsCard from "@/components/admin/StatsCard";

import {
  Users,
  CalendarDays,
  Image,
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
            icon={<Image />}
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