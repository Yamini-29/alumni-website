import { Building2, GraduationCap, MapPin } from "lucide-react";

type Alumni = { name: string; batch: string; college: string; company: string; city: string };

export default function AlumniCard({ alumni }: { alumni: Alumni }) {
  const initials = alumni.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  return <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
    <div className="flex h-28 items-center justify-center bg-gradient-to-r from-[#0B1E3C] to-[#1f3b73]"><span className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#C9A227] text-xl font-bold text-[#0B1E3C]">{initials}</span></div>
    <div className="space-y-3 p-5"><div><h3 className="text-lg font-bold text-[#0B1E3C]">{alumni.name}</h3><p className="text-sm text-slate-500">Class of {alumni.batch}</p></div>
      <p className="flex gap-2 text-sm text-slate-700"><GraduationCap size={16} className="shrink-0 text-[#C9A227]"/>{alumni.college}</p>
      {alumni.company && <p className="flex gap-2 text-sm text-slate-700"><Building2 size={16} className="shrink-0 text-[#C9A227]"/>{alumni.company}</p>}
      <p className="flex gap-2 text-sm text-slate-500"><MapPin size={16} className="shrink-0 text-[#C9A227]"/>{alumni.city}</p>
    </div>
  </article>;
}