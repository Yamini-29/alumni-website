import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-white h-20 border-b flex items-center justify-between px-8">

      <div className="relative">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          placeholder="Search..."
          className="
          pl-10
          py-2
          border
          rounded-xl
          w-80
          text-gray-700
          "
        />
      </div>

      <div className="flex items-center gap-6">

        <Bell className="text-gray-700" />

        <div className="w-10 h-10 rounded-full bg-[#C218D4]" />

      </div>
    </div>
  );
}