"use client";

import { Search, RotateCcw } from "lucide-react";

interface Props {
  search: string;
  setSearch: (v: string) => void;

  batch: string;
  setBatch: (v: string) => void;

  category: string;
  setCategory: (v: string) => void;

  city: string;
  setCity: (v: string) => void;
}

const categories = [
  "All",
  "IIT",
  "NIT",
  "AIIMS",
  "NEET",
  "CBSE",
  "Others",
];

export default function DirectoryFilters({
  search,
  setSearch,
  batch,
  setBatch,
  category,
  setCategory,
  city,
  setCity,
}: Props) {
  const clear = () => {
    setSearch("");
    setBatch("");
    setCategory("All");
    setCity("");
  };

  return (
    <div className="sticky top-24 rounded-3xl border border-[#E4DCCB] bg-[#FCFBF8] p-6 shadow-[0_25px_60px_rgba(24,59,122,.08)]">

      {/* Search */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search alumni, company or college..."
          className="w-full rounded-2xl border border-[#E4DCCB] bg-[#F7F4ED] py-4 pl-14 pr-5 text-slate-800 outline-none focus:border-[#183B7A]"
        />
      </div>

      {/* Category Chips */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-[#183B7A]">
          Higher Education
        </p>

        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-[#183B7A] text-white shadow-lg"
                  : "bg-[#F7F4ED] text-slate-600 hover:bg-[#EFE9DD]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Batch
          </label>

          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full rounded-xl border border-[#E4DCCB] bg-[#F7F4ED] px-4 py-3 outline-none focus:border-[#183B7A]"
          >
            <option value="">All Batches</option>
            {Array.from({ length: 15 }, (_, i) => 2026 - i).map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            City
          </label>

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Chennai"
            className="w-full rounded-xl border border-[#E4DCCB] bg-[#F7F4ED] px-4 py-3 outline-none focus:border-[#183B7A]"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">

        <p className="text-sm text-slate-500">
          Discover alumni by batch, stream and location
        </p>

        <button
          onClick={clear}
          className="flex items-center gap-2 rounded-xl border border-[#E4DCCB] px-4 py-2 text-sm font-medium text-slate-600 hover:bg-[#F7F4ED]"
        >
          <RotateCcw size={16} />
          Clear All
        </button>

      </div>
    </div>
  );
}