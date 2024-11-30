import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import BoxReports from "./Reports/BoxReports";
import AddJobPositions from "./Actions/JobPositions";
import AddEmployee from "./Actions/AddEmployee";

export default function PayrollContent() {
  const { id, name } = useParams();

  const [isJobPositionModalOpen, setIsJobPositionModalOpen] = useState(false);

  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  console.log("ID: ", id);
  console.log("Name: ", name);

  return (
    <div className="bg-[#F4F6FA] dark:bg-gray-900 min-h-screen animate__animated animate__fadeIn">
      <Navbar />
      <BoxReports id={id} payrollName={name} payrollID={id} />
      <div className="px-28 py-6">
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <div class="relative ">
              <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                class="block mt-1 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search employee name/ID"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              class="gap-1 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 border border-black focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setIsJobPositionModalOpen(true)}
            >
              {" "}
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
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
              Job Positions
            </button>
            {isJobPositionModalOpen && (
              <AddJobPositions
                isJobPositionModalOpen={isJobPositionModalOpen}
                setIsJobPositionModalOpen={setIsJobPositionModalOpen}
                isAddEmployeeModalOpen={isAddEmployeeModalOpen}
                setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen}
              />
            )}
            <button
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownRadio"
              class="gap-1 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 border border-black focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setIsAddEmployeeModalOpen(true)}
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Add Employee
            </button>
            {isAddEmployeeModalOpen && (
              <AddEmployee
                isAddEmployeeModalOpen={isAddEmployeeModalOpen}
                setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen}
                isJobPositionModalOpen={isJobPositionModalOpen}
                setIsJobPositionModalOpen={setIsJobPositionModalOpen}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
