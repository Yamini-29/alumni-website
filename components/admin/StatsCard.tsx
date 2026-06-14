import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-6
      border
      "
    >
      <div className="flex justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {value}
          </h3>
        </div>

        <div
          className="
          w-12
          h-12
          rounded-xl
          bg-[#C218D4]/10
          flex
          items-center
          justify-center
          text-[#C218D4]
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}