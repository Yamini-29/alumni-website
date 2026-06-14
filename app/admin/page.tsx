import Topbar from "@/components/admin/Topbar";
import StatsCard from "@/components/admin/StatsCard";

import {
  Users,
  CalendarDays,
  Image,
  Megaphone,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <>
      <Topbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-8 text-gray-700">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 text-2xl text-gray-700">

          <StatsCard
            title="Total Alumni"
            value="1,245"
            icon={<Users />}
          />

          <StatsCard
            title="Events"
            value="12"
            icon={<CalendarDays />}
          />

          <StatsCard
            title="Gallery Images"
            value="350"
            icon={<Image />}
          />

          <StatsCard
            title="Announcements"
            value="18"
            icon={<Megaphone />}
          />

        </div>

      </div>
    </>
  );
}