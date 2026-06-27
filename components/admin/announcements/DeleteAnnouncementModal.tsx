"use client";

import { Announcement } from "@/types/announcement";

interface Props {
  announcements: Announcement[];

  setAnnouncements: React.Dispatch<
    React.SetStateAction<Announcement[]>
  >;

  selectedAnnouncement: Announcement | null;

  closeModal: () => void;
}

export default function DeleteAnnouncementModal({
  announcements,
  setAnnouncements,
  selectedAnnouncement,
  closeModal,
}: Props) {
  if (!selectedAnnouncement) return null;

  const handleDelete = () => {
    const updated = announcements.filter(
      (announcement) =>
        announcement.id !==
        selectedAnnouncement.id
    );

    setAnnouncements(updated);

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-red-600 mb-3">
          Delete Announcement
        </h2>

        <p className="text-gray-700 leading-7">

          Are you sure you want to delete

          <span className="font-semibold text-gray-900">

            {" "}
            "{selectedAnnouncement.title}"

          </span>

          ?

        </p>

        <p className="text-gray-500 mt-3 text-sm">

          This action cannot be undone.

        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}