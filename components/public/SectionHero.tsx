import Image from "next/image";
interface Props {
  label: string;
  title: string;
  description: string;
  showLogo?: boolean;
}

export default function SectionHero({
  label,
  title,
  description,
  showLogo = false,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#F7F5F2] pt-24 pb-7">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

  <div className="grid items-center gap-10 lg:grid-cols-12">

    {/* Left */}
    <div className="lg:col-span-7">

      <p className="uppercase tracking-[0.35em] text-sm font-semibold text-[#D8A11C]">
        {label}
      </p>

      <h1 className="mt-3 text-5xl lg:text-6xl font-bold leading-tight text-[#12233D]">
        {title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        {description}
      </p>

    </div>

    {/* Right Logo */}
    {showLogo && (
      <div className="lg:col-span-5 flex justify-center lg:justify-end">

        <div className="relative">

          <div className="absolute inset-0 rounded-full bg-[#D8A11C]/20 blur-3xl" />

          <div className="absolute left-4 top-4 h-full w-full rounded-full bg-[#183B7A]/10 blur-xl" />

          <div className="relative rounded-full bg-white border border-slate-100 shadow-[0_30px_80px_rgba(24,59,122,.15)] p-10">

            <Image
              src="/images/tis_logo.png"
              alt="TIS Logo"
              width={200}
              height={200}
              className="object-contain"
            />

          </div>

        </div>

      </div>
    )}

  </div>

</div>
    </section>
  );
}