"use client";

import { useState } from "react";
import { Leader } from "@/types/leadership";
import { fileToBase64 } from "@/lib/fileToBase64";

interface Props {
  leaders: Leader[];
  setLeaders: React.Dispatch<React.SetStateAction<Leader[]>>;

  closeModal: () => void;
  onSuccess: () => Promise<void>;

  mode: "add" | "edit";
  selectedLeader?: Leader | null;
}

export default function LeaderModal({
  leaders,
  setLeaders,
  closeModal,
  onSuccess,
  mode,
  selectedLeader,
}: Props) {
  const [name, setName] = useState(selectedLeader?.name || "");

  const [designation, setDesignation] = useState(
    selectedLeader?.designation || ""
  );

  const [message, setMessage] = useState(
    selectedLeader?.message || ""
  );

  const [image, setImage] = useState(
    selectedLeader?.image || ""
  );

  const [displayOrder, setDisplayOrder] = useState(
    selectedLeader?.displayOrder || 1
  );

  const [isVisible, setIsVisible] = useState(
    selectedLeader?.isVisible ?? true
  );

  const handleSubmit = async () => {
    if (!name || !designation || !message || !image) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      name,
      designation,
      message,
      image,
      displayOrder,
      isVisible,
    };

    try {
      if (mode === "add") {
        const response = await fetch("/api/admin/leadership", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          alert("Failed to create leader");
          return;
        }
      } else {
        const response = await fetch(
          `/api/admin/leadership/${selectedLeader?.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          alert("Failed to update leader");
          return;
        }
      }

      await onSuccess();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="border-b p-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === "add"
              ? "Add Leadership Member"
              : "Edit Leadership"}
          </h2>

          <p className="mt-1 text-gray-600">
            Manage the leadership carousel shown on the student website.
          </p>
        </div>

        {/* Body */}

        <div className="grid grid-cols-2 gap-5 p-6">
          <div className="col-span-2">
            <label className="mb-2 block font-medium text-gray-700">
              Leadership Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) setImage(await fileToBase64(file));
              }}
              className="w-full rounded-xl border p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Designation
            </label>

            <input
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Chairman"
              className="w-full rounded-xl border p-3 text-gray-900"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block font-medium text-gray-700">
              Leadership Message
            </label>

            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Display Order
            </label>

            <input
              type="number"
              value={displayOrder}
              onChange={(e) =>
                setDisplayOrder(Number(e.target.value))
              }
              className="w-full rounded-xl border p-3 text-gray-900"
            />
          </div>

          <div className="flex items-center gap-3 pt-8">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
              className="h-5 w-5 accent-[#303F9F]"
            />

            <span className="font-medium text-gray-700">
              Visible on Student Website
            </span>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={closeModal}
            className="rounded-xl border px-5 py-2 text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-[#303F9F] px-5 py-2 text-white"
          >
            {mode === "add" ? "Save Leader" : "Update Leader"}
          </button>
        </div>
      </div>
    </div>
  );
}