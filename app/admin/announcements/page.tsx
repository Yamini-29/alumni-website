"use client";

import { useState } from "react";

import announcementData from "@/data/announcements.json";

import { Announcement } from "@/types/announcement";

import AnnouncementModal from "@/components/admin/announcements/AnnouncementModal";
import AnnouncementDrawer from "@/components/admin/announcements/AnnouncementDrawer";
import DeleteAnnouncementModal from "@/components/admin/announcements/DeleteAnnouncementModal";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(announcementData);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [mode, setMode] = useState<"add" | "edit">("add");

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  const [showDrawer, setShowDrawer] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const filteredAnnouncements = announcements.filter((announcement) => {
    const keyword = search.toLowerCase();

    return (
      announcement.title.toLowerCase().includes(keyword) ||
      announcement.description.toLowerCase().includes(keyword) ||
      announcement.category.toLowerCase().includes(keyword) ||
      announcement.createdBy.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Announcement Management
          </h1>

          <p className="text-lg text-gray-600 mt-2">
            Create and manage announcements for the alumni portal.
          </p>

        </div>

        <button
          onClick={() => {
            setMode("add");
            setSelectedAnnouncement(null);
            setShowModal(true);
          }}
          className="bg-[#303F9F] hover:bg-[#283593] text-white px-6 py-3 rounded-xl font-semibold shadow"
        >
          + Add Announcement
        </button>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow border p-5 mb-8">

        <input
          type="text"
          placeholder="Search title, description, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#303F9F] outline-none"
        />

      </div>

      {/* Cards */}

      <div className="space-y-6">

        {filteredAnnouncements.map((announcement) => (

          <div
            key={announcement.id}
            className="bg-white rounded-2xl shadow border p-8"
          >

            <div className="flex justify-between">

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  {announcement.pinned && (
                    <span className="text-[#D89B06] text-xl">
                      📌
                    </span>
                  )}

                  <h2 className="text-3xl font-bold text-gray-900">
                    {announcement.title}
                  </h2>

                </div>

                <p className="text-gray-700 mt-5 text-lg">
                  {announcement.description}
                </p>

                <div className="flex gap-10 mt-6 text-gray-600">

                  <span>
                    <b className="text-gray-800">
                      Category:
                    </b>{" "}
                    {announcement.category}
                  </span>

                  <span>
                    <b className="text-gray-800">
                      Publish:
                    </b>{" "}
                    {announcement.publishDate}
                  </span>

                </div>

              </div>

              <div className="flex flex-col justify-between items-end">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    announcement.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {announcement.status}
                </span>

                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setSelectedAnnouncement(
                        announcement
                      );
                      setShowDrawer(true);
                    }}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setMode("edit");
                      setSelectedAnnouncement(
                        announcement
                      );
                      setShowModal(true);
                    }}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAnnouncement(
                        announcement
                      );
                      setShowDelete(true);
                    }}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Add/Edit Modal */}

      {showModal && (

        <AnnouncementModal
          announcements={announcements}
          setAnnouncements={setAnnouncements}
          closeModal={() => setShowModal(false)}
          mode={mode}
          selectedAnnouncement={selectedAnnouncement}
        />

      )}

      {/* Drawer */}

      {showDrawer && (

        <AnnouncementDrawer
          announcement={selectedAnnouncement}
          closeDrawer={() => setShowDrawer(false)}
        />

      )}

      {/* Delete */}

      {showDelete && (

        <DeleteAnnouncementModal
          announcements={announcements}
          setAnnouncements={setAnnouncements}
          selectedAnnouncement={selectedAnnouncement}
          closeModal={() => setShowDelete(false)}
        />

      )}

    </div>
  );
}