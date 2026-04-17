export default function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-3xl font-bold text-[#0B1E3C] border-l-4 border-[#C9A227] pl-4">
      {title}
    </h2>
  );
}