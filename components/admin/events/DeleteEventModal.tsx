"use client";

import { Event } from "@/types/event";

interface Props {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;

  selectedEvent: Event | null;

  closeModal: () => void;
}

export default function DeleteEventModal({
  events,
  setEvents,
  selectedEvent,
  closeModal,
}: Props) {
  const handleDelete = () => {
    const updatedEvents = events.filter(
      (item) => item.id !== selectedEvent?.id
    );

    setEvents(updatedEvents);

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[500px] rounded-2xl bg-white p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Event
        </h2>

        <p className="mt-4 text-gray-700">
          Are you sure you want to delete:
        </p>

        <p className="mt-2 text-xl font-semibold text-gray-900">
          {selectedEvent?.title}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={closeModal}
            className="
              rounded-lg
              border
              border-gray-300
              px-5
              py-2
              text-gray-700
              transition
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="
              rounded-lg
              bg-red-600
              px-5
              py-2
              text-white
              transition
              hover:bg-red-700
            "
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}