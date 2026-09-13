"use client";
import { useEffect, useState } from "react";
import AlumniCard from "@/components/public/AlumniCard";
import Pagination from "@/components/public/Pagination";
import SectionHero from "@/components/public/SectionHero";
import DirectoryFilters from "@/components/public/DirectoryFilters";
type Alumni={id:string;name:string;batch:string;college:string;company:string;city:string}; type Result={items:Alumni[];page:number;total:number;totalPages:number};

export default function DirectoryPage(){
  const [result,setResult]=useState<Result>({items:[],page:1,total:0,totalPages:1});
  const [page,setPage]=useState(1);
  const [q,setQ]=useState("");
  const [batch,setBatch]=useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("");
  const [loading,setLoading]=useState(true);useEffect(()=>{
  const timer=setTimeout(()=>{setLoading(true);
    fetch(
  `/api/public/alumni?page=${page}
  &q=${encodeURIComponent(q)}
  &batch=${batch}
  &category=${category}
  &city=${encodeURIComponent(city)}`
).then(r=>r.json()).then(setResult).finally(()=>setLoading(false));
  },250);return()=>clearTimeout(timer)},[page,q,batch,category,city]);
  return (
  <div className="min-h-screen bg-[#F7F4ED]">

    <SectionHero
  label="ALUMNI NETWORK"
  title="Discover Our Global Alumni"
  description="Connect with graduates across universities, industries and countries. Explore inspiring journeys and strengthen lifelong connections."
  showLogo
/>

    <main className="mx-auto max-w-7xl bg-[#F7F4ED] px-6 pb-20">

      {/* Stats
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

        <StatCard title="4500+" subtitle="Alumni" />

        <StatCard title="120+" subtitle="Companies" />

        <StatCard title="35+" subtitle="Countries" />

        <StatCard title={`${result.total}`} subtitle="Directory Records" />

      </div> */}

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <DirectoryFilters
            search={q}
            setSearch={setQ}
            batch={batch}
            setBatch={setBatch}
            category={category}
            setCategory={setCategory}
            city={city}
            setCity={setCity}
          />
        </aside>

        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D8A11C]">
                Browse Members
              </p>

              <h2 className="mt-2 text-4xl font-bold text-[#183B7A]">
                Alumni Directory
              </h2>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-[#183B7A]">
                {result.total}
              </p>
              <p className="text-slate-500">Members</p>
            </div>
          </div>

          {loading ? (

            <p className="text-slate-500">Loading...</p>

          ) : (

            <div className="grid gap-8 sm:grid-cols-2">

              {result.items.map((person) => (
                <AlumniCard key={person.id} alumni={person} />
              ))}

            </div>

          )}

          <div className="mt-14 flex justify-center">

            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              onPageChange={setPage}
            />

          </div>
        </section>
      </div>

    </main>

  </div>
);}