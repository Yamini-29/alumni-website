"use client";

import { useMemo, useState, useEffect } from "react";

import { Event } from "@/types/event";

import EventModal from "@/components/admin/events/EventModal";
import EventDrawer from "@/components/admin/events/EventDrawer";
import DeleteEventModal from "@/components/admin/events/DeleteEventModal";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  async function fetchEvents() {

  const response =
    await fetch("/api/admin/events");

  const data =
    await response.json();

  setEvents(data);

}

useEffect(() => {
  fetchEvents();
}, []);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedEvent, setSelectedEvent] =
    useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      return (
        event.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        event.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        event.venue
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        event.category
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [events, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Event Management
          </h1>

          <p className="mt-2 text-lg text-gray-700">
            Manage alumni events and reunions.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedEvent(null);
            setShowModal(true);
          }}
          className="
            rounded-xl
            bg-[#303F9F]
            px-6
            py-3
            font-semibold
            text-white
            shadow-md
            transition
            hover:bg-[#283593]
          "
        >
          + Add Event
        </button>

      </div>

      {/* Search */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search by title, venue, category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-5
            py-4
            text-gray-900
            shadow-sm
            outline-none
            transition
            focus:border-[#303F9F]
          "
        />

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredEvents.map((event) => (

          <div
            key={event.id}
            className="
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <img
              src={event.banner}
              alt={event.title}
              className="h-48 w-full object-cover"
            />

            <div className="space-y-4 p-6">

              <div className="flex items-start justify-between">

                <h2 className="text-xl font-bold text-gray-900">
                  {event.title}
                </h2>

                {event.featured && (
                  <span
                    className="
                      rounded-full
                      bg-[#C218D4]/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-[#C218D4]
                    "
                  >
                    Featured
                  </span>
                )}

              </div>

              <span
                className="
                  inline-block
                  rounded-full
                  bg-[#303F9F]/10
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-[#303F9F]
                "
              >
                {event.category}
              </span>

              <div className="space-y-2 text-sm text-gray-700">

                <p>
                  📍 {event.venue}
                </p>

                <p>
                  📅 {event.date}
                </p>

                <p>
                  🕒 {event.time}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold

                    ${
                      event.status === "Upcoming"
                        ? "bg-green-100 text-green-700"
                        : event.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {event.status}
                </span>

                <div className="flex gap-2">
                                      <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowDrawer(true);
                    }}
                    className="
                      rounded-lg
                      border
                      border-[#303F9F]
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-[#303F9F]
                      transition
                      hover:bg-[#303F9F]
                      hover:text-white
                    "
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowModal(true);
                    }}
                    className="
                      rounded-lg
                      bg-[#303F9F]
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-white
                      transition
                      hover:bg-[#283593]
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowDeleteModal(true);
                    }}
                    className="
                      rounded-lg
                      bg-red-500
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-white
                      transition
                      hover:bg-red-600
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                {event.description}
              </p>

            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="mt-20 rounded-2xl bg-white py-16 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            No Events Found
          </h2>

          <p className="mt-3 text-gray-600">
            Try changing the search keyword or create a new event.
          </p>
        </div>
      )}

      {showModal && (
        <EventModal
          events={events}
          setEvents={setEvents}
          selectedEvent={selectedEvent}
          mode={selectedEvent ? "edit" : "add"}
          onSuccess={fetchEvents}
          closeModal={() => {
            setShowModal(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {showDrawer && selectedEvent && (
        <EventDrawer
          event={selectedEvent}
          closeDrawer={() => {
            setShowDrawer(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {showDeleteModal && selectedEvent && (
       <DeleteEventModal
  selectedEvent={selectedEvent}
  onSuccess={fetchEvents}
  closeModal={() => {
    setShowDeleteModal(false);
    setSelectedEvent(null);
  }}
/>
      )}
    </div>
  );
}