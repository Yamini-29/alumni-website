"use client";

import { Alumni } from "@/types/alumni";

interface Props {
  alumni: Alumni[];

  setSelectedAlumni: (alumni: Alumni) => void;

  setShowModal: (value: boolean) => void;

  setShowDeleteModal: (value: boolean) => void;

  setShowDrawer: (value: boolean) => void;
}

export default function AlumniTable({
  alumni,
  setSelectedAlumni,
  setShowModal,
  setShowDeleteModal,
  setShowDrawer,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left text-gray-800">Name</th>
            <th className="p-4 text-left text-gray-800">Batch</th>
            <th className="p-4 text-left text-gray-800">College</th>
            <th className="p-4 text-left text-gray-800">Company</th>
            <th className="p-4 text-left text-gray-800">City</th>
            <th className="p-4 text-left text-gray-800">Status</th>
            <th className="p-4 text-left text-gray-800">Actions</th>

          </tr>

        </thead>

        <tbody>

          {alumni.map((person) => (

            <tr
              key={person.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4 font-semibold text-gray-900">
                {person.name}
              </td>

              <td className="p-4 text-gray-700">
                {person.batch}
              </td>

              <td className="p-4 text-gray-700">
                {person.college}
              </td>

              <td className="p-4 text-gray-700">
                {person.company}
              </td>

              <td className="p-4 text-gray-700">
                {person.city}
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
                  "
                >
                  {person.status}
                </span>

              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() => {
                      setSelectedAlumni(person);
                      setShowDrawer(true);
                    }}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAlumni(person);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAlumni(person);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg"
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
  );
}