export default function Footer() {
  return (
    <footer className="mt-20">

      {/* 🔝 TOP MAP SECTION */}
      <div className="relative h-[300px] text-white flex items-center justify-center text-center">

        {/* Background */}
        <img
          src="/images/map.jpg"
          className="absolute w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Top cities where our alumni live
          </h2>

          <div className="flex flex-wrap justify-center gap-10 text-[#C9A227] font-semibold">

            <div>
              <p className="text-sm text-gray-300">6932 alumni</p>
              <p className="text-xl">Bengaluru</p>
            </div>

            <div>
              <p className="text-sm text-gray-300">512 alumni</p>
              <p className="text-xl">Hyderabad</p>
            </div>

            <div>
              <p className="text-sm text-gray-300">359 alumni</p>
              <p className="text-xl">Chennai</p>
            </div>

          </div>
        </div>
      </div>

      {/* 🔻 MAIN FOOTER */}
      <div className="bg-[#2c2c2c] text-gray-300 px-10 py-12">

        <div className="grid md:grid-cols-4 gap-10 text-sm">

          {/* Browse */}
          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2">
              <li>Directory</li>
              <li>Map</li>
              <li>Location</li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-white font-semibold mb-4">Events</h3>
            <ul className="space-y-2">
              <li>Annual Reunion 2025</li>
              <li>Alumni Meet 2024</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect to us</h3>
            <p>info@school.com</p>
            <p>+91 98765 43210</p>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
            </ul>
          </div>

        </div>
      </div>

      {/* 🟠 BOTTOM BAR
      <div className="bg-[#9b98b7] text-white text-sm flex justify-between px-10 py-4">

        <p>© Copyright 2026</p>

        <p>
          Built by Alumni Network
        </p>

      </div> */}

    </footer>
  );
}