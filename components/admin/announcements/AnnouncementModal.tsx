"use client";

import { useState, useEffect } from "react";
import { Announcement } from "@/types/announcement";

interface Props {
  closeModal: () => void;
  mode: "add" | "edit";
  selectedAnnouncement?: Announcement | null;
  onSuccess: () => Promise<void>;
}

export default function AnnouncementModal({
  closeModal,
  mode,
  selectedAnnouncement,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [publishDate, setPublishDate] = useState("");
  const [pinned, setPinned] = useState(false);
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">("DRAFT");

  useEffect(() => {
    if (mode === "edit" && selectedAnnouncement) {
      setTitle(selectedAnnouncement.title);
      setDescription(selectedAnnouncement.description);
      setCategory(selectedAnnouncement.category);
      setPublishDate(selectedAnnouncement.publishDate);
      setPinned(selectedAnnouncement.pinned);
      setStatus(selectedAnnouncement.status);
    } else {
      setTitle("");
      setDescription("");
      setCategory("General");
      setPublishDate("");
      setPinned(false);
      setStatus("DRAFT");
    }
  }, [mode, selectedAnnouncement]);

  const handleSubmit = async () => {
    if (!title || !description || !publishDate) {
      alert("Please fill all fields");
      return;
    }

    if (mode === "add") {
      await fetch("/api/admin/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          status,
          pinned,
          publishDate,
          createdBy: "Admin",
        }),
      });
    } else {
      await fetch(
        `/api/admin/announcements/${selectedAnnouncement?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            category,
            status,
            pinned,
            publishDate,
            createdBy: "Admin",
          }),
        }
      );
    }

    await onSuccess();

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

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "PUBLISHED" | "DRAFT")
            }
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>

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
            onClick={handleSubmit}
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
            Save Announcement
          </button>

        </div>

      </div>

    </div>
  );
}