"use client";

import { useEffect, useState } from "react";

const leaders = [
  { image: "/images/chairman.jpg", title: "Chairman" },
  { image: "/images/vice.jpg", title: "Vice Chairman" },
  { image: "/images/principal.jpg", title: "Principal" },
];

const alumni = [
  "Yamini",
  "Arjun",
  "Sneha",
  "Rahul",
  "Kiran",
  "Divya",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % leaders.length);
    }, 4000);

    return () => clearInterval(i);
  }, []);

  return (
    <section className="bg-black text-white py-20 overflow-hidden">

      {/* 🔝 BIG CAROUSEL */}
      <div className="relative w-full overflow-hidden">

        <div
          className="flex transition-transform duration-700 ease-in-out gap-6 px-10"
          style={{
            transform: `translateX(-${index * 70}%)`,
          }}
        >
          {leaders.map((l, i) => (
            <div
              key={i}
              className="min-w-[70%] h-[400px] relative rounded-3xl overflow-hidden"
            >
              <img
                src={l.image}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <h3 className="absolute bottom-6 left-6 text-xl">
                {l.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🔻 SMALL SYNCED ROW */}
      <div className="mt-10 overflow-hidden">

        <div
          className="flex gap-4 px-10 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 220}px)`,
          }}
        >
          {alumni.map((a, i) => (
            <div
              key={i}
              className="min-w-[200px] bg-white text-black rounded-2xl p-5"
            >
              {a}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}