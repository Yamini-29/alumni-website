import Link from "next/link";
import { Users, CalendarDays, Megaphone } from "lucide-react";

const cards = [
  {
    title: "Alumni Directory",
    desc: "Connect with alumni across batches",
    link: "/directory",
    icon: <Users size={28} />,
  },
  {
    title: "Events & Reunions",
    desc: "Stay updated with upcoming events",
    link: "/events",
    icon: <CalendarDays size={28} />,
  },
  {
    title: "Announcements",
    desc: "Latest updates from the institution",
    link: "/announcements",
    icon: <Megaphone size={28} />,
  },
];

export default function GlassCards() {
  return (
    <div className="relative -mt-24 px-10 z-20">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <Link href={card.link} key={i}>
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

              <div className="mb-4 text-[#C9A227]">
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {card.title}
              </h3>

              <p className="text-sm text-gray-200">
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}