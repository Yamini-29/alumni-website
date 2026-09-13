import {
  BriefcaseBusiness,
  Building2,
  Code2,
  ExternalLink,
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
  linkedin?: string | null;
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
  const initials = alumni.name
    .split(" ")
    .map((namePart) => namePart[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-[#E4DCCB] bg-[#FCFBF8] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(24,59,122,.12)]">

      {/* Top Glow */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#D8A11C]/10 blur-3xl" />

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#183B7A] to-[#2E56A6] text-2xl font-bold text-white shadow-lg">
          {initials}
        </div>

        <div>
          <h3 className="text-3xl font-bold text-[#183B7A]">
            {alumni.name}
          </h3>

          <p className="text-slate-500">
            Batch of {alumni.batch}
          </p>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F7F4ED] px-3 py-1.5 text-sm font-semibold text-[#183B7A]">
        <Icon size={16} />
        {profession.label}
      </div>

      {alumni.linkedin && (
        <a
          href={alumni.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 px-3 py-2 text-sm font-semibold text-[#0A66C2] transition hover:bg-[#0A66C2]/20"
        >
          <ExternalLink size={16} />
          LinkedIn
        </a>
      )}

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