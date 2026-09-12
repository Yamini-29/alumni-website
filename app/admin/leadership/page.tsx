"use client";

import { useEffect, useState } from "react";
import { Leader } from "@/types/leadership";
import LeaderModal from "@/components/admin/leadership/LeaderModal";
import DeleteLeaderModal from "@/components/admin/leadership/DeleteLeaderModal";

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedLeader, setSelectedLeader] =
    useState<Leader | null>(null);

  async function fetchLeaders() {
    const response = await fetch("/api/admin/leadership");

    const data = await response.json();

    setLeaders(data);
  }

  useEffect(() => {
    fetchLeaders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Leadership Management
          </h1>

          <p className="mt-2 text-lg text-gray-600">
            Manage chairman, principal and leadership messages.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedLeader(null);
            setShowModal(true);
          }}
          className="rounded-xl bg-[#303F9F] px-6 py-3 font-semibold text-white"
        >
          + Add Leader
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              src={leader.image}
              alt={leader.name}
              className="h-72 w-full object-cover"
            />

            <div className="space-y-3 p-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {leader.name}
                </h2>

                <p className="text-[#303F9F]">
                  {leader.designation}
                </p>
              </div>

              <p className="line-clamp-4 text-sm text-gray-600">
                {leader.message}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                  Order {leader.displayOrder}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    leader.isVisible
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {leader.isVisible ? "Visible" : "Hidden"}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedLeader(leader);
                    setShowModal(true);
                  }}
                  className="
                    flex-1
                    rounded-lg
                    bg-blue-100
                    py-2
                    text-blue-700
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedLeader(leader);
                    setShowDeleteModal(true);
                  }}
                  className="
                    flex-1
                    rounded-lg
                    bg-red-100
                    py-2
                    text-red-700
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {leaders.length === 0 && (
        <div className="mt-16 rounded-2xl bg-white py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            No Leadership Records
          </h2>

          <p className="mt-2 text-gray-600">
            Add your first chairman or principal message.
          </p>
        </div>
      )}

      {showModal && (
        <LeaderModal
          leaders={leaders}
          setLeaders={setLeaders}
          selectedLeader={selectedLeader}
          mode={selectedLeader ? "edit" : "add"}
          onSuccess={fetchLeaders}
          closeModal={() => {
            setShowModal(false);
            setSelectedLeader(null);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteLeaderModal
          selectedLeader={selectedLeader}
          onSuccess={fetchLeaders}
          closeModal={() => {
            setShowDeleteModal(false);
            setSelectedLeader(null);
          }}
        />
      )}
    </div>
  );
}