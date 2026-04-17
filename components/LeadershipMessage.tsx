"use client";

import { useEffect, useState } from "react";

const messages = [
  {
    name: "Chairman",
    title: "Mr. T.Venkatesan",
    text: "Our vision is to nurture excellence and create leaders who contribute meaningfully to society.",
    image: "/images/chairman.jpg",
  },
  {
    name: "Vice Chairman",
    title: "Mrs. Nirmala Venkatesan",
    text: "We believe in holistic development and empowering students with knowledge and values.",
    image: "/images/vice.jpg",
  },
  {
    name: "Principal",
    title: "H. Jayashree Badrinath ",
    text: "Our institution is committed to academic excellence and shaping future innovators.",
    image: "/images/principal.jpg",
  },
];

export default function LeadershipMessage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const m = messages[current];

  return (
    <section className="px-10 py-20 bg-black">
      <h2 className="text-3xl font-bold text-center mb-12">
        Message from Leadership
      </h2>

      <div className="max-w-6xl mx-auto bg-[#0B1E3C]/90 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-10 transition-all duration-700">

        {/* Image */}
        <img
          src={m.image}
          className="w-[300px] h-[300px] object-cover rounded-2xl shadow-md"
        />

        {/* Text */}
        <div className="flex-1">
          <p className="text-gray-200 italic text-lg leading-relaxed">
            “{m.text}”
          </p>

          <div className="mt-6">
            <h3 className="font-semibold text-lg">
              {m.title}
            </h3>
            <p className="text-gray-500 text-sm">
              {m.name}
            </p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {messages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full ${
              current === i ? "bg-[#0B1E3C]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}