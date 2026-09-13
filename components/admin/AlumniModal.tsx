"use client";

import { useState } from "react";
import { Alumni } from "@/types/alumni";


interface Props {
  alumni: Alumni[];
  setAlumni: React.Dispatch<React.SetStateAction<Alumni[]>>;
  closeModal: () => void;
  onSuccess: () => Promise<void>;
  mode: "add" | "edit";
  selectedAlumni?: Alumni | null;
}

export default function AlumniModal({
  alumni,
  setAlumni,
  closeModal,
  onSuccess,
  mode,
  selectedAlumni,
}: Props)  {
  const [name, setName] = useState(
    selectedAlumni?.name || ""
  );

  const [batch, setBatch] = useState(
    selectedAlumni?.batch || ""
  );

  const [college, setCollege] = useState(
    selectedAlumni?.college || ""
  );

  const [company, setCompany] = useState(
    selectedAlumni?.company || ""
  );

  const [city, setCity] = useState(
    selectedAlumni?.city || ""
  );

  const [linkedin, setLinkedin] = useState(
    selectedAlumni?.linkedin || ""
  );

  const [phone, setPhone] = useState(
    selectedAlumni?.phone || ""
  );

  const [address, setAddress] = useState(
    selectedAlumni?.address || ""
  );

  const [status, setStatus] = useState<"ACTIVE" | "HIDDEN">(
    selectedAlumni?.status || "ACTIVE"
  );

  const handleSubmit = async () => {
    if (
      !name ||
      !batch ||
      !college ||
      !company ||
      !city
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (mode === "add") {
        const response = await fetch("/api/admin/alumni", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            batch,
            college,
            company,
            city,
            linkedin,
            phone,
            address,
            status,
          }),
        });

        if (!response.ok) {
          alert("Unable to save alumni");
          return;
        }
      } else {
        const response = await fetch(`/api/admin/alumni/${selectedAlumni?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            batch,
            college,
            company,
            city,
            linkedin,
            phone,
            address,
            status,
          }),
        });

        if (!response.ok) {
          alert("Unable to update alumni");
          return;
        }
      }

      await onSuccess();
      closeModal();
    } catch (error) {
      console.error("Error saving alumni:", error);
      alert("An error occurred while saving alumni");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">

        <div className="mb-6">

          <h2 className="text-3xl font-bold text-gray-900">
            {mode === "add"
              ? "Add Alumni"
              : "Edit Alumni"}
          </h2>

          <p className="text-gray-700 mt-1">
            {mode === "add"
              ? "Create a new alumni record"
              : "Update alumni details"}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <input
            type="text"
            placeholder="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <input
            type="text"
            placeholder="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="border border-gray-300 rounded-lg p-3 text-gray-900 w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="border border-gray-300 rounded-lg p-3 text-gray-900 w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Chennai, Tamil Nadu"
              className="border border-gray-300 rounded-lg p-3 text-gray-900 w-full"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "ACTIVE" | "HIDDEN")
            }
            className="border border-gray-300 rounded-lg p-3 text-gray-900"
          >
            <option value="ACTIVE">Active</option>
            <option value="HIDDEN">Hidden</option>
          </select>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-[#303F9F] text-white"
          >
            {mode === "add"
              ? "Save Alumni"
              : "Update Alumni"}
          </button>

        </div>

      </div>

    </div>
  );
  }