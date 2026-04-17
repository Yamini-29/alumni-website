import announcements from "@/data/announcements.json";

export default function Announcements() {
  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold mb-10">
        Announcements
      </h1>

      <div className="space-y-6">
        {announcements.map((a, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-400 mb-2">
              {a.date}
            </p>

            <h2 className="text-xl font-semibold">
              {a.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {a.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}