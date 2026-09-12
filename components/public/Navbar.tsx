"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
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
  const hasSolidBackground = scrolled || path !== "/";

  return <nav className={`fixed z-[9999] flex w-full items-center justify-between px-5 py-4 transition-all duration-300 md:px-10 ${hasSolidBackground ? "bg-[#0B1E3C] shadow-md" : "bg-transparent"}`}>
    <Link href="/" className="text-lg font-bold text-white md:text-xl">Alumni Network</Link>
    <div className="flex gap-3 text-xs sm:gap-5 sm:text-sm md:gap-8">{links.map((link) =>
      <Link key={link.name} href={link.href} className={`text-white transition hover:text-[#C9A227] ${path === link.href ? "text-[#C9A227]" : ""}`}>{link.name}</Link>
    )}</div>
  </nav>;
}