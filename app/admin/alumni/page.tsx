"use client";

import { useState } from "react";
import alumniData from "@/data/alumni.json";
import { Alumni } from "@/types/alumni";

export default function AlumniPage() {
  const [search, setSearch] = useState("");

  const filteredAlumni = alumniData.filter((alumni: Alumni) =>
    alumni.name.toLowerCase().includes(search.toLowerCase()) ||
    alumni.college.toLowerCase().includes(search.toLowerCase()) ||
    alumni.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Alumni Management
          </h1>

          <p className="text-gray-700 mt-2 text-lg">
            Manage alumni records and directory information
          </p>
        </div>

        <button
          className="
          bg-[#303F9F]
          hover:bg-[#283593]
          transition
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          shadow-md
          "
        >
          + Add Alumni
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-700 font-medium">
            Total Alumni
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            {alumniData.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-700 font-medium">
            IIT Students
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            18
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-700 font-medium">
            NIT Students
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            25
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-gray-700 font-medium">
            Working Alumni
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            52
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-8">

        <input
          type="text"
          placeholder="Search by name, college, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            p-4
            border
            rounded-xl
            text-gray-900
            placeholder:text-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-[#303F9F]
          "
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4 text-gray-800 font-semibold">
                Name
              </th>

              <th className="text-left p-4 text-gray-800 font-semibold">
                Batch
              </th>

              <th className="text-left p-4 text-gray-800 font-semibold">
                College
              </th>

              <th className="text-left p-4 text-gray-800 font-semibold">
                Company
              </th>

              <th className="text-left p-4 text-gray-800 font-semibold">
                City
              </th>

              <th className="text-left p-4 text-gray-800 font-semibold">
                Status
              </th>

              <th className="text-left p-4 text-gray-800 font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAlumni.map((alumni) => (

              <tr
                key={alumni.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-semibold text-gray-900">
                  {alumni.name}
                </td>

                <td className="p-4 text-gray-700">
                  {alumni.batch}
                </td>

                <td className="p-4 text-gray-700">
                  {alumni.college}
                </td>

                <td className="p-4 text-gray-700">
                  {alumni.company}
                </td>

                <td className="p-4 text-gray-700">
                  {alumni.city}
                </td>

                <td className="p-4">

                  <span
                    className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    "
                  >
                    {alumni.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      className="
                      px-3
                      py-1
                      bg-blue-100
                      text-blue-700
                      rounded-lg
                      font-medium
                      "
                    >
                      Edit
                    </button>

                    <button
                      className="
                      px-3
                      py-1
                      bg-red-100
                      text-red-700
                      rounded-lg
                      font-medium
                      "
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}