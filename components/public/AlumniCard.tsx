import Image from "next/image";
import {
  BriefcaseBusiness,
  Building2,
  Code2,
  GraduationCap,
  MapPin,
  Stethoscope,
} from "lucide-react";

interface AlumniCardData {
  id: string;
  name: string;
  batch: string;
  college: string;
  company: string;
  city: string;
}

const getProfession = (company: string) => {
  const text = company.toLowerCase();

  if (text.includes("doctor") || text.includes("hospital")) {
    return { icon: Stethoscope, label: "Doctor" };
  }

  if (
    text.includes("software") ||
    text.includes("google") ||
    text.includes("microsoft") ||
    text.includes("gep") ||
    text.includes("wipro")
  ) {
    return { icon: Code2, label: "Engineer" };
  }

  if (text.includes("professor")) {
    return { icon: GraduationCap, label: "Academia" };
  }

  return { icon: BriefcaseBusiness, label: "Professional" };
};

export default function AlumniCard({ alumni }: { alumni: AlumniCardData }) {
  const profession = getProfession(alumni.company);
  const Icon = profession.icon;

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-[#E4DCCB] bg-[#FCFBF8] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(24,59,122,.12)]">

      {/* Top Glow */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#D8A11C]/10 blur-3xl" />

      {/* Avatar */}
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#FCFBF8] shadow-lg">
        <Image
          src="/images/default-avatar.png"
          alt={alumni.name}
          fill
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="mt-5 text-2xl font-bold text-[#183B7A]">
        {alumni.name}
      </h3>

      <p className="mt-1 text-slate-500">
        Batch of {alumni.batch}
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F7F4ED] px-3 py-1.5 text-sm font-semibold text-[#183B7A]">
        <Icon size={16} />
        {profession.label}
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex gap-3 items-center">
          <Building2 size={18} className="text-[#183B7A]" />
          <span className="text-slate-700">{alumni.company}</span>
        </div>

        <div className="flex gap-3 items-center">
          <GraduationCap size={18} className="text-[#183B7A]" />
          <span className="text-slate-700">{alumni.college}</span>
        </div>

        <div className="flex gap-3 items-center">
          <MapPin size={18} className="text-[#D8A11C]" />
          <span className="text-slate-700">{alumni.city}</span>
        </div>
      </div>

      {/* <button className="mt-7 w-full rounded-2xl bg-[#183B7A] py-3 font-semibold text-white transition hover:bg-[#122F63]">
        View Profile
      </button> */}
    </div>
  );
}