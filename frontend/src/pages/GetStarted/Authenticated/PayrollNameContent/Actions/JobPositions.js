import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api_url from "../../../../../components/api_url";

export default function JobPositions({
  isJobPositionModalOpen,
  setIsJobPositionModalOpen,
  setIsAddEmployeeModalOpen,
}) {
  const [rows, setRows] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [editingId, setEditingId] = useState(null); // New state to track which row is being edited
  const { id } = useParams();

  useEffect(() => {
    const fetchjobPositions = async () => {
      try {
        const response = await api_url.post("/job-positions", {
          payroll_list_id: id,
        });

        if (response.status === 200) {
          const formattedRows = response.data.map((position) => ({
            id: position.job_position_id,
            title: position.title,
            salary: position.salary,
            isExisting: true,
          }));

          const maxId = Math.max(
            ...response.data.map((position) => position.job_position_id),
            0
          );
          setNextId(maxId + 1);
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
        id: nextId,
        title: "",
        salary: "",
        isExisting: false,
      },
    ]);
    setNextId(nextId + 1);
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id || row.isExisting));
  };

  const updateRow = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = async () => {
    try {
      const newRows = rows.filter((row) => !row.isExisting);

      // Validate new rows
      const invalidRows = newRows.filter((row) => !row.title || !row.salary);
      if (invalidRows.length > 0) {
        alert(
          "Please fill in all required fields (title and salary) before submitting."
        );
        return;
      }

      // Handle creating new rows
      const createPromises = newRows.map((row) =>
        api_url.post("/add-job-positions", {
          title: row.title,
          salary: row.salary,
          payroll_list_id: id,
        })
      );

      // Handle updating edited row if any
      if (editingId !== null) {
        const editedRow = rows.find((row) => row.id === editingId);
        if (editedRow) {
          await api_url.put("/edit-job-positions", {
            job_position_id: editedRow.id,
            title: editedRow.title,
            salary: editedRow.salary,
          });
        }
      }

      await Promise.all(createPromises);

      // Refresh the job positions list
      const response = await api_url.post("/job-positions", {
        payroll_list_id: id,
      });

      if (response.status === 200) {
        const formattedRows = response.data.map((position) => ({
          id: position.job_position_id,
          title: position.title,
          salary: position.salary,
          isExisting: true,
        }));

        setRows(formattedRows);
        setEditingId(null); // Reset editing state

        const maxId = Math.max(
          ...response.data.map((position) => position.job_position_id),
          0
        );
        setNextId(maxId + 1);
      }
    } catch (error) {
      console.error("Error saving job positions:", error);
      alert("Error saving job positions. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api_url.post("/delete-job-positions", {
        job_position_id: id,
      });
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting job position:", error);
      alert("Error deleting job position. Please try again.");
    }
  };

  const handleEdit = (id) => {
    setEditingId(id); // Enable editing for this row
  };

  const handleAddEmployee = () => {
    setIsJobPositionModalOpen(false);

    setIsAddEmployeeModalOpen(true);
  };

  return (
    <div
      id="crud-modal"
      tabIndex="-1"
      aria-hidden="true"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
      className="animate__animated animate__fadeIn flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Job Positions
              </h3>
              <div
                onClick={handleAddEmployee}
                className="flex items-center text-black dark:text-white gap-1 p-1 border border-black dark:border-white rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                <h1>Proceed to Add Employee</h1>
              </div>
            </div>
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
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3">
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
                    <td className="px-6 py-4">{row.id}</td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={row.title}
                        onChange={(e) =>
                          updateRow(row.id, "title", e.target.value)
                        }
                        disabled={row.isExisting && editingId !== row.id}
                        className="title/jobposition w-full p-1 border rounded dark:bg-gray-700 dark:text-white"
                        placeholder="Enter Job Title"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={row.salary}
                        onChange={(e) =>
                          updateRow(row.id, "salary", e.target.value)
                        }
                        disabled={row.isExisting && editingId !== row.id}
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
                        {row.isExisting && (
                          <>
                            <button
                              className="delete"
                              onClick={() => handleDelete(row.id)}
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
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                            <button
                              className="edit"
                              onClick={() => handleEdit(row.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="blue"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </button>
                          </>
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
