import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../../../../components/api_url";

export default function JobPositions({
  isJobPositionModalOpen,
  setIsJobPositionModalOpen,
}) {
  const [rows, setRows] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchjobPositions = async () => {
      try {
        const response = await api_url.post("/job-positions", {
          payroll_list_id: id,
        });

        if (response.status === 200) {
          // Transform the API data to match our row structure
          const formattedRows = response.data.map((position) => ({
            id: position.job_position_id,
            title: position.title,
            salary: position.salary,
            isExisting: true, // Flag to identify existing records
          }));
          setRows(formattedRows);
        }
      } catch (error) {
        console.error("Error fetching job positions:", error);
      }
    };

    fetchjobPositions();
  }, [id]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        title: "",
        salary: "",
        isExisting: false,
      },
    ]);
  };

  const removeRow = (id) => {
    // Only remove new rows, not existing ones
    setRows(rows.filter((row) => row.id !== id || row.isExisting));
  };

  const updateRow = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = async () => {
    // Handle both updates to existing positions and creation of new positions
    try {
      // Here you would implement the API calls to save the changes
      console.log("Rows to save:", rows);
      // You could filter new vs existing rows and handle them appropriately
      const newRows = rows.filter((row) => !row.isExisting);
      const existingRows = rows.filter((row) => row.isExisting);

      // Example API calls (implement these according to your backend):
      // await Promise.all(newRows.map(row => api_url.post("/job-positions/create", { ...row, payroll_list_id: id })));
      // await Promise.all(existingRows.map(row => api_url.put("/job-positions/update", { ...row, payroll_list_id: id })));
    } catch (error) {
      console.error("Error saving job positions:", error);
    }
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      className="animate__animated animate__fadeIn flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Job Positions
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
              onClick={() => setIsJobPositionModalOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-800 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Position/Job Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Salary
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={row.title}
                        onChange={(e) =>
                          updateRow(row.id, "title", e.target.value)
                        }
                        className="title/jobposition w-full p-1 border rounded dark:bg-gray-700 dark:text-white"
                        placeholder="Enter Job Title"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={row.salary}
                        onChange={(e) =>
                          updateRow(row.id, "salary", e.target.value)
                        }
                        className="salary w-full p-1 border rounded dark:bg-gray-700 dark:text-white"
                        placeholder="Enter Salary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-4">
                        {!row.isExisting && (
                          <button
                            className="removeRow text-red-600 hover:text-red-800"
                            onClick={() => removeRow(row.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="red"
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <th scope="row" className="px-6 py-3 text-base"></th>
                  <td className="px-6 py-3"></td>
                  <td className="px-3 py-3">
                    <button
                      onClick={addRow}
                      className="flex items-center p-1 border border-black dark:border-white w-fit rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h1 className="text-xs">Add Job Position</h1>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
