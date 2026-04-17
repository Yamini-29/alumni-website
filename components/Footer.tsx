export default function Footer() {
  return (
    <footer className="bg-[#0B1E3C] text-gray-300 px-10 py-12 mt-20">

      <div className="grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-white font-semibold text-lg">
            Alumni Network
          </h2>
          <p className="text-sm mt-3">
            Building lifelong connections across generations.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>About</li>
            <li>Events</li>
            <li>Gallery</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold">Contact</h3>
          <p className="text-sm mt-3">
            info@school.com
          </p>
          <p className="text-sm">Chennai, India</p>
        </div>

      </div>

      <p className="text-center text-xs mt-10 text-gray-500">
        © 2026 Alumni Network
      </p>
    </footer>
  );
}