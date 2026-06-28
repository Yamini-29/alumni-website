"use client";

import { Event } from "@/types/event";
import { X, CalendarDays, Clock3, MapPin, Tag, User } from "lucide-react";

interface Props {
  event: Event | null;
  closeDrawer: () => void;
}

export default function EventDrawer({
  event,
  closeDrawer,
}: Props) {
  if (!event) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={closeDrawer}
      />

      {/* Drawer */}

      <div
        className="
          fixed
          right-0
          top-0
          z-50
          h-screen
          w-[500px]
          overflow-y-auto
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Event Details
          </h2>

          <button
            onClick={closeDrawer}
            className="text-gray-700 transition hover:text-gray-900"
          >
            <X />
          </button>
        </div>

        {/* Banner */}

        <img
          src={event.banner}
          alt={event.title}
          className="h-60 w-full object-cover"
        />

        {/* Body */}

        <div className="space-y-8 p-6">
          {/* Title */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {event.title}
              </h3>

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

            <p className="mt-3 leading-7 text-gray-700">
              {event.description}
            </p>
          </div>

          {/* Information */}

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-1 text-[#303F9F]"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Venue
                </p>

                <p className="font-medium text-gray-900">
                  {event.venue}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays
                size={20}
                className="mt-1 text-[#303F9F]"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Date
                </p>

                <p className="font-medium text-gray-900">
                  {event.date}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3
                size={20}
                className="mt-1 text-[#303F9F]"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Time
                </p>

                <p className="font-medium text-gray-900">
                  {event.time}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Tag
                size={20}
                className="mt-1 text-[#303F9F]"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="font-medium text-gray-900">
                  {event.category}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">
                Registration Link
              </p>

              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all font-medium text-[#303F9F] hover:underline"
              >
                {event.registrationLink || "Not Available"}
              </a>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">
                Status
              </p>

              <span
                className={`
                  rounded-full
                  px-4
                  py-1
                  text-sm
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
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">
                Featured
              </p>

              <span
                className={`
                  rounded-full
                  px-4
                  py-1
                  text-sm
                  font-semibold

                  ${
                    event.featured
                      ? "bg-[#C218D4]/10 text-[#C218D4]"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                {event.featured ? "Yes" : "No"}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <User
                size={20}
                className="mt-1 text-[#303F9F]"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Created By
                </p>

                <p className="font-medium text-gray-900">
                  {event.createdBy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}