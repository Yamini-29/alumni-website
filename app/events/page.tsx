import events from "@/data/events.json";

export default function Events() {
  const upcoming = events.filter((e) => e.type === "upcoming");
  const past = events.filter((e) => e.type === "past");

  return (
    <div className="px-10 py-20">

      <h1 className="text-4xl font-bold mb-10">
        Events & Reunions
      </h1>

      <h2 className="text-2xl font-semibold mb-6">Upcoming</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {upcoming.map((e, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-sm text-gray-500">{e.date}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {past.map((e, i) => (
          <div key={i} className="bg-gray-100 p-5 rounded-xl">
            <h3>{e.title}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}