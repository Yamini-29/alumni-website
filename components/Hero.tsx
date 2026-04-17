"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/school1.jpg",

  "/images/school3.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">

      {/* Background Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute w-full h-full object-cover transition-all duration-1000 ${
            index === current ? "opacity-100 scale-105" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl px-6"
      >
        {/* 🔥 IMPROVED TITLE */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent drop-shadow-lg">
            Thamarai
          </span>
          <br />
          <span className="bg-[#C9A227] bg-clip-text text-transparent drop-shadow-lg">
            International School
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-200">
A Legacy That Lives Beyond Classrooms,Reconnect with your roots, celebrate achievements, and grow together as one alumni community.        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 bg-[#C9A227] text-black font-semibold rounded-full hover:scale-105 transition">
            Explore Alumni
          </button>

          <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
            View Events
          </button>
        </div>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-6 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index
                ? "bg-white scale-125"
                : "bg-gray-400 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 right-10 text-white animate-bounce text-xl">
        ↓
      </div>
    </section>
  );
}