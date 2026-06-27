"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  batchFilter: string;
  setBatchFilter: (value: string) => void;

  categoryFilter: string;
  setCategoryFilter: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  collegeFilter: string;
  setCollegeFilter: (value: string) => void;
}

export default function AlumniFilters({
  search,
  setSearch,

  batchFilter,
  setBatchFilter,

  categoryFilter,
  setCategoryFilter,

  statusFilter,
  setStatusFilter,

  collegeFilter,
  setCollegeFilter,
}: Props) {
    const batches = [
  "All",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">

      {/* Search */}

      <input
        type="text"
        placeholder="Search by name, college, company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        border
        rounded-xl
        p-4
        text-gray-900
        placeholder:text-gray-500
        focus:outline-none
        focus:ring-2
        focus:ring-[#303F9F]
      "
      />

      {/* Filters */}

      <div className="grid md:grid-cols-5 gap-4 mt-5">

        {/* Batch */}
        <div className="relative">

        <select
          value={batchFilter}
          onChange={(e) =>
            setBatchFilter(e.target.value)
          }
className="
w-full
border
rounded-xl
px-4
py-3
pr-10
bg-white
text-gray-800
appearance-none
focus:ring-2
focus:ring-[#303F9F]
focus:outline-none
"
        >
          {batches.map((batch) => (

<option
  key={batch}
  value={batch}
>
  {batch}
</option>

))}
        </select>
        <svg
className="
absolute
right-3
top-1/2
-translate-y-1/2
w-4
h-4
text-gray-500
pointer-events-none
"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>
<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="M19 9l-7 7-7-7"
/>
</svg>

</div>

        {/* Category */}
            <div className="relative">
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
className="
w-full
border
rounded-xl
px-4
py-3
pr-10
bg-white
text-gray-800
appearance-none
focus:ring-2
focus:ring-[#303F9F]
focus:outline-none
"
        >
          <option value="All">All Categories</option>

          <option value="JEE">JEE</option>

          <option value="NEET">NEET</option>

          <option value="Arts">Arts</option>

          <option value="Commerce">Commerce</option>

          <option value="Sports">Sports</option>
        </select>
        <svg
className="
absolute
right-3
top-1/2
-translate-y-1/2
w-4
h-4
text-gray-500
pointer-events-none
"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>
<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="M19 9l-7 7-7-7"
/>
</svg>

</div>

        {/* Employment */}
          <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
className="
w-full
border
rounded-xl
px-4
py-3
pr-10
bg-white
text-gray-800
appearance-none
focus:ring-2
focus:ring-[#303F9F]
focus:outline-none
"
        >
          <option value="All">All Employment</option>

          <option value="Student">Student</option>

          <option value="Working">Working</option>

          <option value="Higher Studies">
            Higher Studies
          </option>

          <option value="Entrepreneur">
            Entrepreneur
          </option>
        </select>
<svg
className="
absolute
right-3
top-1/2
-translate-y-1/2
w-4
h-4
text-gray-500
pointer-events-none
"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>
<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="M19 9l-7 7-7-7"
/>
</svg>

</div>
        {/* College */}
        <div className="relative">

        <select
          value={collegeFilter}
          onChange={(e) =>
            setCollegeFilter(e.target.value)
          }
className="
w-full
border
rounded-xl
px-4
py-3
pr-10
bg-white
text-gray-800
appearance-none
focus:ring-2
focus:ring-[#303F9F]
focus:outline-none
"
        >
          <option value="All">All Colleges</option>

          <option value="IIT">IIT</option>

          <option value="NIT">NIT</option>

          <option value="IIIT">IIIT</option>

          <option value="AIIMS">AIIMS</option>

          <option value="Anna">Anna University</option>

          <option value="BITS">BITS</option>
        </select>
          <svg
className="
absolute
right-3
top-1/2
-translate-y-1/2
w-4
h-4
text-gray-500
pointer-events-none
"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>
<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="M19 9l-7 7-7-7"
/>
</svg>

</div>
        {/* Reset */}

        <button
          onClick={() => {
            setSearch("");
            setBatchFilter("All");
            setCategoryFilter("All");
            setStatusFilter("All");
            setCollegeFilter("All");
          }}
          className="
          rounded-lg
          bg-gray-100
          hover:bg-gray-200
          transition
          font-semibold
          text-gray-700
        "
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}