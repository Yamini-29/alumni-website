interface Props {
  title: string;
  subtitle: string;
}

export default function StatCard({
  title,
  subtitle,
}: Props) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-sm border border-slate-100 text-center">
      <h3 className="text-4xl font-bold text-[#183B7A]">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}