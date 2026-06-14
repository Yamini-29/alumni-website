"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Image,
  Megaphone,
  MapPinned,
  UserCog,
  Settings,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    name: "Alumni",
    icon: Users,
    href: "/admin/alumni",
  },
  {
    name: "Events",
    icon: CalendarDays,
    href: "/admin/events",
  },
  {
    name: "Announcements",
    icon: Megaphone,
    href: "/admin/announcements",
  },
  {
    name: "Gallery",
    icon: Image,
    href: "/admin/gallery",
  },
  {
    name: "Map",
    icon: MapPinned,
    href: "/admin/map",
  },
  {
    name: "Leadership",
    icon: UserCog,
    href: "/admin/leadership",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#303F9F] text-white shadow-xl">

      {/* Logo */}

      <div className="p-6 border-b border-white/10">

        <h1 className="text-2xl font-bold">
          Thamarai
        </h1>

        <p className="text-sm text-white/70">
          Alumni Admin Portal
        </p>

      </div>

      {/* Menu */}

      <nav className="mt-6">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="
              flex items-center gap-3
              px-6 py-4
              hover:bg-[#C218D4]
              transition
              "
            >
              <Icon size={20} />

              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}