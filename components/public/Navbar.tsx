"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/public/events" },
    { name: "Directory", href: "/public/directory" },
    { name: "Gallery", href: "/public/gallery" },
    { name: "Announcements", href: "/public/announcements" },
  ];

  return (
    <nav
      className={`fixed w-full z-[9999] px-10 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1E3C] shadow-md"
          : "bg-transparent"
      }`}
    >
      <h1 className="text-white text-xl font-bold">
        Alumni Network
      </h1>

      <div className="flex gap-8 text-sm">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-white hover:text-[#C9A227] ${
              path === link.href ? "text-[#C9A227]" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}