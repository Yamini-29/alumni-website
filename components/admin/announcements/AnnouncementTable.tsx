"use client";

import { Announcement } from "@/types/announcement";
import { Pin } from "lucide-react";

interface Props {
  announcements: Announcement[];

  setSelectedAnnouncement: (
    announcement: Announcement
  ) => void;

  setShowModal: (value: boolean) => void;

  setShowDrawer: (value: boolean) => void;

  setShowDeleteModal: (value: boolean) => void;
}

export default function AnnouncementTable({

  announcements,

  setSelectedAnnouncement,

  setShowModal,

  setShowDrawer,

  setShowDeleteModal,

}: Props) {

  return (

    <div className="space-y-5">

      {announcements.map((announcement) => (

        <div
          key={announcement.id}
          className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          p-6
          "
        >

          <div className="flex justify-between">

            <div>

              <div className="flex items-center gap-2">

                {announcement.pinned && (

                  <Pin
   size={18}
   className="text-[#D89B06] fill-[#D89B06]"
/>

                )}

                <h2 className="text-2xl font-bold text-gray-900">

                  {announcement.title}

                </h2>

              </div>

              <p className="text-gray-600 mt-3 line-clamp-2">

                {announcement.description}

              </p>

            </div>

            <span
              className={`
              px-3
              py-1
              rounded-full
              text-sm
              h-fit

              ${
                announcement.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : announcement.status === "Draft"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-300 text-gray-700"
              }
              `}
            >

              {announcement.status}

            </span>

          </div>

          <div className="flex justify-between items-center mt-6">

            <div className="flex gap-4 text-sm text-gray-600">

              <span>

                Category:
                {" "}
                {announcement.category}

              </span>

              <span>

                Publish:
                {" "}
                {announcement.publishDate}

              </span>

            </div>

            <div className="flex gap-2">

              <button

                onClick={() => {

                  setSelectedAnnouncement(
                    announcement
                  );

                  setShowDrawer(true);

                }}

                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg"

              >

                View

              </button>

              <button

                onClick={() => {

                  setSelectedAnnouncement(
                    announcement
                  );

                  setShowModal(true);

                }}

                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg"

              >

                Edit

              </button>

              <button

                onClick={() => {

                  setSelectedAnnouncement(
                    announcement
                  );

                  setShowDeleteModal(true);

                }}

                className="bg-red-100 text-red-700 px-3 py-1 rounded-lg"

              >

                Delete

              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}