"use client";

import { Alumni } from "@/types/alumni";

interface Props {
  alumni: Alumni[];
}

export default function AlumniStats({
  alumni,
}: Props) {
  const total = alumni.length;

  const iit = alumni.filter((a) =>
    a.college.toLowerCase().includes("iit")
  ).length;

  const nit = alumni.filter((a) =>
    a.college.toLowerCase().includes("nit")
  ).length;

  const working = alumni.filter(
    (a) =>
      a.employmentStatus === "Working"
  ).length;

  const stats = [
    {
      title: "Total Alumni",
      value: total,
    },
    {
      title: "IIT Students",
      value: iit,
    },
    {
      title: "NIT Students",
      value: nit,
    },
    {
      title: "Working Alumni",
      value: working,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
          bg-white
          p-6
          rounded-2xl
          shadow-sm
          border
          hover:shadow-lg
          transition
        "
        >
          <p className="text-gray-600 font-medium">
            {stat.title}
          </p>

          <h2 className="text-4xl font-bold text-[#303F9F] mt-3">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}