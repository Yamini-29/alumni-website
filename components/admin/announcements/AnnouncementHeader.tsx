"use client";

interface Props {
  setShowModal: (value: boolean) => void;
}

export default function AnnouncementHeader({
  setShowModal,
}: Props) {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-gray-900">
          Announcement Management
        </h1>

        <p className="text-gray-600 mt-2">
          Create and manage announcements for the alumni portal.
        </p>

      </div>

      <button
        onClick={() => setShowModal(true)}
        className="
        bg-[#303F9F]
        hover:bg-[#283593]
        px-6
        py-3
        rounded-xl
        text-white
        font-semibold
        "
      >
        + Add Announcement
      </button>

    </div>
  );
}