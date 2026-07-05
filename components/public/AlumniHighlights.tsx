"use client";

const alumni = [
  { name: "Yamini", college: "IIT Madras" },
  { name: "Arjun", college: "NIT Trichy" },
  { name: "Sneha", college: "AIIMS Delhi" },
  { name: "Rahul", college: "Anna University" },
];

export default function AlumniHighlights() {
  return (
    <section className="py-20 bg-black text-white">

      <h2 className="text-2xl font-semibold px-10 mb-6">
        Notable Alumni
      </h2>

      <div className="flex gap-4 overflow-x-auto px-10 snap-x snap-mandatory">

        {alumni.map((a, i) => (
          <div
            key={i}
            className="snap-center min-w-[250px] bg-white text-black rounded-2xl p-5 flex-shrink-0"
          >
            <h3 className="font-semibold">{a.name}</h3>
            <p className="text-sm text-gray-500">
              {a.college}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}