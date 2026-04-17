import { GraduationCap, Building2, MapPin } from "lucide-react";

export default function AlumniCard({ alumni }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Top */}
      <div className="bg-gradient-to-r from-[#0B1E3C] to-[#1f3b73] p-6 flex justify-center">
        <img
          src={alumni.profileImage}
          className="w-20 h-20 rounded-full border-4 border-white object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-gray-600 text-lg">
          {alumni.name}
        </h3>

        <p className="text-sm text-gray-500">
          Class of {alumni.batch}
        </p>

        {/* 🎓 College FIRST */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <GraduationCap size={16} />
          <span>{alumni.education.college}</span>
        </div>

        {/* 💼 Company */}
        {alumni.current.company && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 size={16} />
            <span>{alumni.current.company}</span>
          </div>
        )}

        {/* 📍 Location */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={16} />
          <span>{alumni.current.location}</span>
        </div>
      </div>
    </div>
  );
}