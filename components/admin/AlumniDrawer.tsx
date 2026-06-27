"use client";

import { Alumni } from "@/types/alumni";
import { X } from "lucide-react";


interface Props {
  alumni: Alumni | null;
  closeDrawer: () => void;
}

export default function AlumniDrawer({
  alumni,
  closeDrawer,
}: Props) {
  if (!alumni) return null;

  return (
    <>

      {/* Backdrop */}

      <div
        className="
        fixed
        inset-0
        bg-black/20
        z-40
        "
        onClick={closeDrawer}
      />

      {/* Drawer */}

      <div
        className="
        fixed
        right-0
        top-0
        h-screen
        w-[450px]
        bg-white
        shadow-2xl
        z-50
        overflow-y-auto
        "
      >

        {/* Header */}

        <div
          className="
          flex
          justify-between
          items-center
          p-6
          border-b
          "
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Alumni Details
          </h2>

          <button onClick={closeDrawer} className="text-gray-700">
            <X />
          </button>
        </div>

        {/* Profile */}

        <div className="p-6">

          <div className="flex flex-col items-center">

            <div
              className="
              w-24
              h-24
              rounded-full
              bg-[#303F9F]
              text-white
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {alumni.name.charAt(0)}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-4">
              {alumni.name}
            </h3>

            <p className="text-gray-600">
              Batch {alumni.batch}
            </p>

          </div>

          {/* Details */}

          <div className="mt-8 space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                College
              </p>

              <p className="font-medium text-gray-900">
                {alumni.college}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Company
              </p>

              <p className="font-medium text-gray-900">
                {alumni.company}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                City
              </p>

              <p className="font-medium text-gray-900">
                {alumni.city}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <span
                className="
                bg-green-100
                text-green-700
                px-3
                py-1
                rounded-full
                text-sm
                "
              >
                {alumni.status}
              </span>
            </div>

          </div>

        </div>

      </div>

    </>
  );
}