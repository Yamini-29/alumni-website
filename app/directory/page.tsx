"use client";

import { useState } from "react";
import alumni from "@/data/alumni.json";
import AlumniCard from "@/components/AlumniCard";
import DirectoryHero from "@/components/DirectoryHero";


export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");

  const filtered = alumni.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.current.company.toLowerCase().includes(search.toLowerCase());

    const matchesBatch =
      selectedBatch === "All" || a.batch.toString() === selectedBatch;

    return matchesSearch && matchesBatch;
  });

  const batches = ["All", ...new Set(alumni.map((a) => a.batch.toString()))];

  
  return (
    <div>
         <DirectoryHero />
    <div className="flex px-10 py-16 gap-10">
      
      {/* 🔍 SIDEBAR */}
      <div className="w-[280px] bg-white rounded-2xl shadow-md p-6 h-fit">
        <h2 className="text-lg text-gray-700 font-semibold mb-4">Search</h2>

        <input
          type="text"
          placeholder="Search alumni, company..."
          className="w-full text-gray-600 border p-3 rounded-lg mb-6"
          onChange={(e) => setSearch(e.target.value)}
        />

        <h2 className="text-lg text-gray-700 font-semibold mb-3">Filter by Batch</h2>

        <div className="flex flex-wrap gap-2">
          {batches.map((b, i) => (
            <button
              key={i}
              onClick={() => setSelectedBatch(b)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedBatch === b
                  ? "bg-[#C9A227] text-black"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* 👥 GRID */}
      <div className="flex-1">
        {/* <h1 className="text-3xl font-bold mb-6">
          Alumni Directory
        </h1> */}

        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((a, i) => (
            <AlumniCard key={i} alumni={a} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}