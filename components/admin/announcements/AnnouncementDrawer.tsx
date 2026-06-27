"use client";

import { Announcement } from "@/types/announcement";
import { X, Pin, CalendarDays, User, Tag } from "lucide-react";

interface Props {
  announcement: Announcement | null;
  closeDrawer: () => void;
}

export default function AnnouncementDrawer({
  announcement,
  closeDrawer,
}: Props) {
  if (!announcement) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">

      {/* Drawer */}

      <div className="w-full max-w-lg bg-white h-screen shadow-2xl overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold text-gray-900">
            Announcement Details
          </h2>

          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="text-gray-700" size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-8">

          {/* Status */}

          <div className="flex items-center justify-between">

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                announcement.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {announcement.status}
            </span>

            {announcement.pinned && (
              <div className="flex items-center gap-2 text-[#D89B06] font-semibold">
                <Pin size={18} fill="#D89B06" />
                Pinned
              </div>
            )}

          </div>

          {/* Title */}

          <div>

            <p className="text-gray-500 text-sm mb-2">
              Title
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {announcement.title}
            </h1>

          </div>

          {/* Description */}

          <div>

            <p className="text-gray-500 text-sm mb-2">
              Description
            </p>

            <p className="text-gray-700 leading-8">
              {announcement.description}
            </p>

          </div>

          {/* Info */}

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <Tag
                className="text-[#303F9F]"
                size={20}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  Category
                </p>

                <p className="font-semibold text-gray-900">
                  {announcement.category}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <CalendarDays
                className="text-[#303F9F]"
                size={20}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  Publish Date
                </p>

                <p className="font-semibold text-gray-900">
                  {announcement.publishDate}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <CalendarDays
                className="text-[#C218D4]"
                size={20}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  Expiry Date
                </p>

                <p className="font-semibold text-gray-900">
                  {announcement.expiryDate}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <User
                className="text-[#303F9F]"
                size={20}
              />

              <div>

                <p className="text-gray-500 text-sm">
                  Created By
                </p>

                <p className="font-semibold text-gray-900">
                  {announcement.createdBy}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}