export default function Gallery() {
  const images = [
    "https://picsum.photos/400/300?1",
    "https://picsum.photos/400/300?2",
    "https://picsum.photos/400/300?3",
    "https://picsum.photos/400/300?4",
    "https://picsum.photos/400/300?5",
    "https://picsum.photos/400/300?6",
  ];

  return (
    <div className="px-10 py-20">
      <h1 className="text-4xl font-bold mb-10">
        Gallery
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl shadow-md group"
          >
            <img
              src={img}
              className="w-full h-[250px] object-cover group-hover:scale-110 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}