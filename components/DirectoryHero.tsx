export default function DirectoryHero() {
  return (
    <section className="relative h-[300px] flex items-center justify-center text-center text-white">

      {/* Background Image */}
      <img
        src="/images/intro3.jpg"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Alumni Directory
        </h1>

        <p className="mt-3 text-gray-200">
          Connecting our alumni across the globe
        </p>
      </div>
    </section>
  );
}