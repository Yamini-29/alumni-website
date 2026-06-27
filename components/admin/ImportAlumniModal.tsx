"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface Props {
  closeModal: () => void;
  setAlumni: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ImportAlumniModal({
  closeModal,
  setAlumni,
}: Props) {
  const [fileName, setFileName] = useState("");
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) return;

  setLoading(true);
  setFileName(file.name);

  const extension =
    file.name.split(".").pop()?.toLowerCase();

  // CSV

  if (extension === "csv") {

    Papa.parse(file, {

      header: true,

      skipEmptyLines: true,

      complete: (results) => {

        setPreviewData(
          results.data as any[]
        );

        setLoading(false);
      },

      error: (error) => {

        console.error(error);

        alert(
          "Unable to read CSV file"
        );

        setLoading(false);
      },

    });

    return;
  }

  // Excel

  const reader = new FileReader();

  reader.onload = (event) => {

    try {

      const data =
        event.target?.result;

      const workbook =
        XLSX.read(data, {
          type: "binary",
        });

      const sheetName =
        workbook.SheetNames[0];

      const sheet =
        workbook.Sheets[sheetName];

      const jsonData =
        XLSX.utils.sheet_to_json(sheet);

      setPreviewData(jsonData);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to read Excel file"
      );
    }

    setLoading(false);
  };

  reader.readAsBinaryString(file);
};

  const handleImport = () => {
    if (previewData.length === 0) {
      alert("No data found");
      return;
    }

    const formattedData = previewData.map(
      (row: any) => ({
        id:
          Date.now() +
          Math.floor(
            Math.random() * 100000
          ),

        name:
  row.Name ||
  row.name ||
  row.NAME ||
  "",

        batch: String(
          row.Batch ||
          row.batch ||
          row.BATCH ||
          ""
        ),

        college:
          row.College ||
          row.college ||
          row.COLLEGE ||
          "",

        company:
          row.Company ||
          row.company ||
          row.COMPANY ||
          "",

        city:
          row.City ||
          row.city ||
          row.CITY ||
          "",

        category:
          row.Category ||
          row.category ||
          row.CATEGORY ||
          "",

        phone:
          row.Phone ||
          row.phone ||
          row.PHONE ||
          "",

        email:
          row.Email ||
          row.email ||
          row.EMAIL ||
          "",

        status:
          row.Status ||
          row.status ||
          row.STATUS ||
          "Active",
      })
    );

    setAlumni((prev) => [
      ...prev,
      ...formattedData,
    ]);

    alert(
      `${formattedData.length} alumni imported successfully`
    );

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
        w-[900px]
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        shadow-2xl
        p-8
        "
      >
        {/* Header */}

        <div className="mb-8">

          <h2
            className="
            text-3xl
            font-bold
            text-gray-900
            "
          >
            Import Alumni
          </h2>

          <p
            className="
            text-gray-700
            mt-2
            "
          >
            Upload an Excel file and
            preview records before
            importing.
          </p>

        </div>

        {/* Upload Area */}

        <div
          className="
          border-2
          border-dashed
          border-gray-300
          rounded-2xl
          p-8
          text-center
          "
        >
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="mb-4"
          />

          <p className="text-gray-700">
            Supported formats:
Excel (.xlsx, .xls)
CSV (.csv)
          </p>

          {fileName && (
            <p
              className="
              mt-3
              font-medium
              text-[#303F9F]
              "
            >
              {fileName}
            </p>
          )}
        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-6">
            <p className="text-gray-700">
              Reading file...
            </p>
          </div>
        )}

        {/* Preview */}

        {previewData.length > 0 && (

          <div className="mt-8">

            <div className="flex justify-between items-center mb-4">

              <h3
                className="
                text-xl
                font-semibold
                text-gray-900
                "
              >
                Preview Data
              </h3>

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
                {previewData.length}
                {" "}
                Records Found
              </span>

            </div>

            <div
              className="
              border
              rounded-xl
              overflow-hidden
              "
            >

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-3 text-gray-700 text-left">
                      Name
                    </th>

                    <th className="p-3 text-gray-700 text-left">
                      Batch
                    </th>

                    <th className="p-3 text-gray-700 text-left">
                      College
                    </th>

                    <th className="p-3 text-gray-700 text-left">
                      Company
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {previewData
                    .slice(0, 10)
                    .map(
                      (
                        row: any,
                        index
                      ) => (

                        <tr
                          key={index}
                          className="
                          border-t
                          "
                        >

                          <td className="p-3 text-gray-700">
                            {row.Name}
                          </td>

                          <td className="p-3 text-gray-700">
                            {row.Batch}
                          </td>

                          <td className="p-3 text-gray-700">
                            {row.College}
                          </td>

                          <td className="p-3 text-gray-700">
                            {row.Company}
                          </td>

                        </tr>

                      )
                    )}

                </tbody>

              </table>

            </div>

            {previewData.length > 10 && (
              <p
                className="
                text-sm
                text-gray-500
                mt-2
                "
              >
                Showing first 10
                records only
              </p>
            )}

          </div>

        )}

        {/* Sample Template */}

        <div
          className="
          mt-8
          bg-blue-50
          rounded-xl
          p-5
          "
        >
          <h4
            className="
            font-semibold
            text-blue-900
            "
          >
            Expected File Columns
          </h4>

          <p
            className="
            text-blue-800
            mt-2
            "
          >
            Name, Batch, College,
            Company, City, Category,
            Phone, Email, Status
          </p>
        </div>

        {/* Footer */}

        <div
          className="
          flex
          justify-end
          gap-3
          mt-8
          "
        >

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
            disabled={
              previewData.length === 0
            }
            onClick={handleImport}
            className="
            px-5
            py-2
            rounded-lg
            bg-[#303F9F]
            text-white
            disabled:opacity-50
            "
          >
            Import Alumni
          </button>

        </div>

      </div>
    </div>
  );
}