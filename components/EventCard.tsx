export default function EventCard({ event }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl transition duration-300">
      
      <div className="overflow-hidden">
        <img
          src={event.image}
          className="h-48 w-full object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg group-hover:text-[#3A86FF] transition">
          {event.title}
        </h3>

        <p className="text-sm text-gray-500">{event.date}</p>

        <p className="mt-2 text-gray-600 text-sm">
          {event.description}
        </p>
      </div>
    </div>
  );
}