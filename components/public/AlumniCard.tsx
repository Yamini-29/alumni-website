import { Building2, GraduationCap, MapPin } from "lucide-react";

type Alumni = { name: string; batch: string; college: string; company: string; city: string };

export default function AlumniCard({ alumni }: { alumni: Alumni }) {
  const initials = alumni.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  return <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_30px_rgba(24,59,122,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,59,122,0.14)]">
    <div className="flex h-28 items-center justify-center bg-gradient-to-r from-[#183b7a] via-[#244b93] to-[#c218d4]"><span className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#d8a11c] text-xl font-bold text-[#183b7a]">{initials}</span></div>
    <div className="space-y-3 p-5"><div><h3 className="text-lg font-bold text-[#183b7a]">{alumni.name}</h3><p className="text-sm text-slate-500">Class of {alumni.batch}</p></div>
      <p className="flex gap-2 text-sm text-slate-700"><GraduationCap size={16} className="shrink-0 text-[#c218d4]"/>{alumni.college}</p>
      {alumni.company && <p className="flex gap-2 text-sm text-slate-700"><Building2 size={16} className="shrink-0 text-[#c218d4]"/>{alumni.company}</p>}
      <p className="flex gap-2 text-sm text-slate-500"><MapPin size={16} className="shrink-0 text-[#c218d4]"/>{alumni.city}</p>
    </div>
  </article>;
}