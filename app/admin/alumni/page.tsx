"use client";
import { useState, useEffect } from "react";
import { Alumni } from "@/types/alumni";
import AlumniModal from "@/components/admin/AlumniModal";
import DeleteAlumniModal from "@/components/admin/DeleteAlumniModal";
import AlumniDrawer from "@/components/admin/AlumniDrawer";
import ExportCenterModal from "@/components/admin/ExportCenterModal";
import ImportAlumniModal
from "@/components/admin/ImportAlumniModal";
import AlumniFilters from "@/components/admin/AlumniFilters";
import AlumniStats from "@/components/admin/AlumniStats";
import AlumniTable from "@/components/admin/AlumniTable";
export default function AlumniPage() {

  async function fetchAlumni() {
  try {
    const response = await fetch("/api/admin/alumni");

    if (!response.ok) {
      throw new Error("Failed to fetch alumni");
    }

    const data = await response.json();

    setAlumni(data);
  } catch (error) {
    console.error(error);
  }
}
useEffect(() => {
  fetchAlumni();
}, []);

  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  
  const [showImportModal, setShowImportModal] = useState(false);


const filteredAlumni = alumni.filter((person) => {
  const matchesSearch =
    person.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    person.college
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    person.company
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesBatch =
  batchFilter === "All" ||
  String(person.batch) === batchFilter;

  const matchesCategory =
    categoryFilter === "All" ||
    person.category === categoryFilter;

  const matchesEmployment =
    statusFilter === "All" ||
    person.employmentStatus === statusFilter;

  const matchesCollege =
    collegeFilter === "All" ||
    person.college.includes(collegeFilter);

  return (
    matchesSearch &&
    matchesBatch &&
    matchesCategory &&
    matchesEmployment &&
    matchesCollege
  );
});
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
          onClick={() => {
            setSelectedAlumni(null);
            setShowModal(true);
          }}
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
        <button
          onClick={() =>
            setShowExportModal(true)
          }
          className="
          bg-[#D89B06]
          text-white
          px-6
          py-3
          rounded-xl
          "
        >
          Export Data
        </button>
        <button
          onClick={() =>
            setShowImportModal(true)
          }
          className="
          bg-[#4CAF50]
          text-white
          px-6
          py-3
          rounded-xl
          "
        >
          Import Data
        </button>

      </div>

     <AlumniStats alumni={alumni} />

     <AlumniFilters
  search={search}
  setSearch={setSearch}

  batchFilter={batchFilter}
  setBatchFilter={setBatchFilter}

  categoryFilter={categoryFilter}
  setCategoryFilter={setCategoryFilter}

  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}

  collegeFilter={collegeFilter}
  setCollegeFilter={setCollegeFilter}
/>

     <AlumniTable
  alumni={filteredAlumni}
  setSelectedAlumni={setSelectedAlumni}
  setShowModal={setShowModal}
  setShowDeleteModal={setShowDeleteModal}
  setShowDrawer={setShowDrawer}
/>

   

      {showModal && (
        <AlumniModal
  alumni={alumni}
  setAlumni={setAlumni}
  closeModal={() => setShowModal(false)}
  onSuccess={fetchAlumni}
  mode={selectedAlumni ? "edit" : "add"}
  selectedAlumni={selectedAlumni}
/>
      )}
      {showDeleteModal && (
  <DeleteAlumniModal
    alumni={alumni}
    setAlumni={setAlumni}
    selectedAlumni={selectedAlumni}
    closeModal={() =>
      setShowDeleteModal(false)
    }
  />
)}
{showDrawer && (
  <AlumniDrawer
    alumni={selectedAlumni}
    closeDrawer={() =>
      setShowDrawer(false)
    }
  />
)}
{
  showExportModal && (
    <ExportCenterModal
      alumni={alumni}
      closeModal={() =>
        setShowExportModal(false)
      }
    />
  )
}
{
showImportModal && (

<ImportAlumniModal
closeModal={() =>
setShowImportModal(false)
}
setAlumni={setAlumni}
/>

)
}

    </div>
    
  );
}