"use client";

import { useState, useEffect } from "react";
import { Announcement } from "@/types/announcement";

interface Props {
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<
    React.SetStateAction<Announcement[]>
  >;
  closeModal: () => void;
  mode: "add" | "edit";
  selectedAnnouncement?: Announcement | null;
}

export default function AnnouncementModal({
  announcements,
  setAnnouncements,
  closeModal,
  mode,
  selectedAnnouncement,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [publishDate, setPublishDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (mode === "edit" && selectedAnnouncement) {
      setTitle(selectedAnnouncement.title);
      setDescription(selectedAnnouncement.description);
      setCategory(selectedAnnouncement.category);
      setPublishDate(selectedAnnouncement.publishDate);
      setExpiryDate(selectedAnnouncement.expiryDate);
      setPinned(selectedAnnouncement.pinned);
    } else {
      setTitle("");
      setDescription("");
      setCategory("General");
      setPublishDate("");
      setExpiryDate("");
      setPinned(false);
    }
  }, [mode, selectedAnnouncement]);

  const handleSubmit = (
    status: "Published" | "Draft"
  ) => {
    if (
      !title ||
      !description ||
      !publishDate ||
      !expiryDate
    ) {
      alert("Please fill all fields");
      return;
    }

    if (mode === "add") {
      const newAnnouncement: Announcement = {
        id: Date.now(),
        title,
        description,
        category,
        publishDate,
        expiryDate,
        pinned,
        status,
        createdBy: "Admin",
      };

      setAnnouncements([
        ...announcements,
        newAnnouncement,
      ]);
    } else {
      const updated = announcements.map((item) => {
        if (item.id === selectedAnnouncement?.id) {
          return {
            ...item,
            title,
            description,
            category,
            publishDate,
            expiryDate,
            pinned,
            status,
          };
        }

        return item;
      });

      setAnnouncements(updated);
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8">

        <div className="mb-6">

          <h2 className="text-3xl font-bold text-gray-900">
            {mode === "add"
              ? "Add Announcement"
              : "Edit Announcement"}
          </h2>

          <p className="text-gray-700 mt-1">
            {mode === "add"
              ? "Create a new announcement"
              : "Update announcement details"}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          >
            <option>General</option>
            <option>Event</option>
            <option>Career</option>
            <option>Scholarship</option>
            <option>Achievement</option>
          </select>

          <div className="col-span-2">

            <textarea
              rows={5}
              placeholder="Announcement Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 resize-none"
            />

          </div>

          <input
            type="date"
            value={publishDate}
            onChange={(e) =>
              setPublishDate(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <input
            type="date"
            value={expiryDate}
            onChange={(e) =>
              setExpiryDate(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <div className="col-span-2">

            <label className="flex items-center gap-3 text-gray-700">

              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) =>
                  setPinned(e.target.checked)
                }
                className="w-5 h-5 accent-[#303F9F]"
              />

              Pin this announcement on top

            </label>

          </div>
                  </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={closeModal}
            className="
              px-5
              py-2
              rounded-lg
              border
              border-gray-300
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={() => handleSubmit("Draft")}
            className="
              px-5
              py-2
              rounded-lg
              bg-yellow-500
              hover:bg-yellow-600
              text-white
              font-semibold
              transition
            "
          >
            Save Draft
          </button>

          <button
            onClick={() => handleSubmit("Published")}
            className="
              px-5
              py-2
              rounded-lg
              bg-[#303F9F]
              hover:bg-[#283593]
              text-white
              font-semibold
              transition
            "
          >
            Publish Announcement
          </button>

        </div>

      </div>

    </div>
  );
}