"use client";

import { useMemo, useState } from "react";
import AlumniCard from "@/components/public/AlumniCard";

type Alumni = { id: string; name: string; batch: string; college: string; company: string; city: string };

export default function DirectoryBrowser({ alumni }: { alumni: Alumni[] }) {
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const batches = ["All", ...new Set(alumni.map((person) => person.batch))];
  const filtered = useMemo(() => alumni.filter((person) => {
    const term = search.toLowerCase();
    return (person.name.toLowerCase().includes(term) || person.company.toLowerCase().includes(term) || person.city.toLowerCase().includes(term)) &&
      (selectedBatch === "All" || person.batch === selectedBatch);
  }), [alumni, search, selectedBatch]);

  return <section className="bg-[#f5f7fb] px-6 py-12 md:px-10">
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <label className="mb-2 block text-sm font-semibold text-[#0B1E3C]">Find alumni</label>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name, company or city" className="w-full rounded-xl border border-slate-200 p-3 text-slate-800 outline-none focus:border-[#C9A227]" />
        <p className="mb-3 mt-7 text-sm font-semibold text-[#0B1E3C]">Graduating batch</p>
        <div className="flex flex-wrap gap-2">{batches.map((batch) => <button key={batch} onClick={() => setSelectedBatch(batch)} className={`rounded-full px-3 py-1.5 text-sm transition ${selectedBatch === batch ? "bg-[#C9A227] text-[#0B1E3C]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{batch}</button>)}</div>
      </aside>
      <div><p className="mb-5 text-sm font-medium text-slate-500">{filtered.length} alumni found</p>
        {filtered.length ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((person) => <AlumniCard key={person.id} alumni={person} />)}</div> : <div className="rounded-2xl bg-white p-12 text-center text-slate-500 shadow-sm">No alumni match those filters.</div>}
      </div>
    </div>
  </section>;
}