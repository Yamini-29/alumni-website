"use client";

import { useState } from "react";
import { Alumni } from "@/types/alumni";
import Papa from "papaparse";
import * as XLSX from "xlsx";

interface Props {
  alumni: Alumni[];
  closeModal: () => void;
}

export default function ExportCenterModal({
  alumni,
  closeModal,
}: Props) {
  const [format, setFormat] = useState("csv");

  const [batch, setBatch] = useState("All");

  const [category, setCategory] = useState("All");
  const [includeHidden, setIncludeHidden] = useState(false);
  const [status, setStatus] = useState("All");
  const [selectedColumns, setSelectedColumns] = useState([
        "name",
        "batch",
        "college",
        "company",
      ]);
  const availableColumns = [
      { key: "name", label: "Name" },
      { key: "batch", label: "Batch" },
      { key: "college", label: "College" },
      { key: "company", label: "Company" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
    ];
    const toggleColumn = (column: string) => {
        if (selectedColumns.includes(column)) {
          setSelectedColumns(
            selectedColumns.filter(
              (item) => item !== column
            )
          );
        } else {
          setSelectedColumns([
            ...selectedColumns,
            column,
          ]);
        }
      };
  const filteredData = alumni.filter((item) => {

    const batchMatch =
      batch === "All" ||
      item.batch === batch;

    const categoryMatch =
      category === "All" ||
      item.category === category;

    const statusMatch =
      includeHidden
        ? true
        : item.status !== "Hidden";
    return (
      batchMatch &&
      categoryMatch &&
      statusMatch
    );
  });
  

  const handleExport = () => {

    const fileName =
      `Alumni_${batch}_${category}`;

    if (format === "csv") {

      const csv =
        Papa.unparse(filteredData);

      const blob = new Blob(
        [csv],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${fileName}.csv`;

      link.click();

    } else {

      const worksheet =
        XLSX.utils.json_to_sheet(
          filteredData
        );

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Alumni"
      );

      XLSX.writeFile(
        workbook,
        `${fileName}.xlsx`
      );
    }

    closeModal();
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        bg-white
        rounded-2xl
        shadow-2xl
        p-8
        w-[500px]
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          text-gray-900
          "
        >
          Export Alumni Data
        </h2>

        <p
          className="
          text-gray-600
          mt-2
          mb-6
          "
        >
          Export filtered alumni
          records.
        </p>

        {/* Format */}

        <div className="mb-5">

          <label
            className="
            block
            mb-2
            font-medium
            text-gray-800
            "
          >
            Format
          </label>

          <select
            value={format}
            onChange={(e) =>
              setFormat(e.target.value)
            }
            className="
            w-full
            border
            rounded-lg
            p-3
            text-gray-900
            "
          >
            <option value="csv">
              CSV
            </option>

            <option value="excel">
              Excel (.xlsx)
            </option>

          </select>
        </div>
 

        {/* Batch */}

        <div className="mb-5">

          <label
            className="
            block
            mb-2
            font-medium
            text-gray-800
            "
          >
            Batch
          </label>

          <select
            value={batch}
            onChange={(e) =>
              setBatch(e.target.value)
            }
            className="
            w-full
            border
            rounded-lg
            p-3
            text-gray-900
            "
          >
            <option>All</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
          </select>

        </div>

        {/* Category */}

        <div className="mb-5">

          <label
            className="
            block
            mb-2
            font-medium
            text-gray-800
            "
          >
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
            w-full
            border
            rounded-lg
            p-3
            text-gray-900
            "
          >
            <option>All</option>
            <option>JEE</option>
            <option>NEET</option>
            <option>Commerce</option>
            <option>CBSE</option>
          </select>

        </div>
        <div className="mb-6">

  <label
    className="
    block
    mb-3
    font-medium
    text-gray-800
    "
  >
    Columns To Export
  </label>

  <div className="grid grid-cols-2 gap-2">

    {availableColumns.map((column) => (

      <label
        key={column.key}
        className="
        flex
        items-center
        gap-2
        text-gray-800
        "
      >

        <input
          type="checkbox"
          checked={selectedColumns.includes(
            column.key
          )}
          onChange={() =>
            toggleColumn(column.key)
          }
        />

        {column.label}

      </label>

    ))}

  </div>

</div>

        <div className="mb-6">

  <label
    className="
    flex
    items-center
    gap-3
    text-gray-800
    "
  >
    <input
      type="checkbox"
      checked={includeHidden}
      onChange={(e) =>
        setIncludeHidden(
          e.target.checked
        )
      }
    />

    Include Hidden Alumni

  </label>

</div>

        {/* Buttons */}

        <div className="flex justify-end gap-3">

          <button
            onClick={closeModal}
            className="
            px-5
            py-2
            border
            rounded-lg
            text-gray-700
            "
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            className="
            px-5
            py-2
            rounded-lg
            bg-[#303F9F]
            text-white
            "
          >
            Export
          </button>

        </div>

      </div>
    </div>
  );
}