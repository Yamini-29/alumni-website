"use client";

import { useState } from "react";
import { Event } from "@/types/event";

interface Props {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  closeModal: () => void;
  onSuccess: () => Promise<void>;
  mode: "add" | "edit";
  selectedEvent?: Event | null;
}

export default function EventModal({
  events,
  setEvents,
  closeModal,
  onSuccess,
  mode,
  selectedEvent,
}: Props) {
  const [title, setTitle] = useState(
    selectedEvent?.title || ""
  );


  const [description, setDescription] = useState(
    selectedEvent?.description || ""
  );

  const [venue, setVenue] = useState(
    selectedEvent?.venue || ""
  );

  const [category, setCategory] = useState(
    selectedEvent?.category || ""
  );

  const [date, setDate] = useState(
    selectedEvent?.date || ""
  );

  const [time, setTime] = useState(
    selectedEvent?.time || ""
  );

  const [registrationLink, setRegistrationLink] = useState(
    selectedEvent?.registrationLink || ""
  );

  const [banner, setBanner] = useState(
    selectedEvent?.banner || ""
  );

  const [status, setStatus] = useState(
  selectedEvent?.status || "UPCOMING"
);

  const [featured, setFeatured] = useState(
    selectedEvent?.featured || false
  );
  
  const handleSubmit = async () => {

    if (
      !title ||
      !description ||
      !venue ||
      !category ||
      !date ||
      !time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (mode === "add") {
        const response = await fetch("/api/admin/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              title,
              description,
              category,
              venue,
              date,
              time,
              banner,
              featured,
              status,
            }),
        });

        if (!response.ok) {
          alert("Failed to create event");
          return;
        }
      } else {
        const response = await fetch(`/api/admin/events/${selectedEvent?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            category,
            venue,
            date,
            time,
            banner,
            featured,
            status,
          }),
        });

        if (!response.ok) {
          alert("Failed to update event");
          return;
        }
      }

      await onSuccess();
      closeModal();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("An error occurred while saving the event");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-200 px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === "add" ? "Create Event" : "Edit Event"}
          </h2>
          <p className="mt-1 text-gray-700">
            {mode === "add"
              ? "Create a new alumni event."
              : "Update event information."}
          </p>
        </div>

        <div className="overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div className="col-span-2">
              <label className="mb-2 block font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Venue
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Registration Link
              </label>
              <input
                type="url"
                value={registrationLink}
                onChange={(e) => setRegistrationLink(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Banner URL
              </label>
              <input
                type="url"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-[#303F9F]"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 accent-[#303F9F]"
              />
              <label className="text-sm font-medium text-gray-700">
                Mark as featured event
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-8 py-4">
          <button
            onClick={closeModal}
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-[#303F9F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#283593]"
          >
            {mode === "add" ? "Save Event" : "Update Event"}
          </button>
        </div>
      </div>
    </div>
  );
}