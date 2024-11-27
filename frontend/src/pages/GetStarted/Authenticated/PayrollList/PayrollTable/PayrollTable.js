import React, { useEffect, useState } from "react";
import AddPayrollLists from "./Actions/AddPayrollLists";
import api_url from "../../../../../components/api_url";
import moment from "moment";

export default function PayrollTable() {
  const [addPayrollLists, setAddPayrollLists] = useState(false);
  const [payrollLists, setPayrollLists] = useState([]);
  const [user_id, setUser_id] = useState("");

  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));

    if (userCredentials?.Data?.user_id) {
      setUser_id(userCredentials.Data.user_id);
    }
  }, []);

  const fetchPayrollLists = async () => {
    if (!user_id) return;

    try {
      const response = await api_url.post(`payroll-lists/${user_id}`);
      if (response.data) {
        setPayrollLists(response.data);
      }
    } catch (error) {
      console.error("Error fetching payroll lists:", error);
    }
  };
  useEffect(() => {
    fetchPayrollLists();
  }, [user_id]);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search employee name/ID"
          />
        </div>
        <div>
          <button
            id="dropdownRadioButton"
            data-dropdown-toggle="dropdownRadio"
            class="mr-2 gap-1 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 border border-black focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={() => setAddPayrollLists(true)}
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
            Add PayrollList
          </button>
          {addPayrollLists && (
            <AddPayrollLists
              addPayrollLists={addPayrollLists}
              setAddPayrollLists={setAddPayrollLists}
              fetchPayrollLists={fetchPayrollLists}
            />
          )}
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Payroll ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Date Added
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {payrollLists.map((product) => {
            const formattedDate = moment(product.created_date).format(
              "YYYY-MM-DD hh:mm:ss A"
            );

            return (
              <tr
                key={product.payroll_list_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{product.payroll_list_id}</td>

                <td className="px-6 py-4">{product.list_name}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{formattedDate}</td>

                <td className="px-6 py-4">{product.status}</td>

                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
