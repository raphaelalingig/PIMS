import React, { useEffect, useState } from "react";
import AddPayrollLists from "./Actions/AddPayrollLists";
import api_url from "../../../../../components/api_url";
import moment from "moment";
import EditPayrollLists from "./Actions/EditPayrollLists";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function PayrollTable() {
  const [addPayrollLists, setAddPayrollLists] = useState(false);
  const [editPayrollLists, setEditPayrollLists] = useState(false);
  const [payrollLists, setPayrollLists] = useState([]);
  const [user_id, setUser_id] = useState("");

  const [editValue, setEditValue] = useState({
    payroll_id: null,
    list_name: "",
    description: "",
    created_date: null,
    status: 0,
  });

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

  const handleEditClick = (
    payroll_id,
    list_name,
    description,
    created_date,
    status
  ) => {
    setEditPayrollLists(true);

    setEditValue({
      payroll_id,
      list_name,
      description,
      created_date,
      status,
    });
  };

  const handleDelete = async (payroll_id, list_name) => {
    Swal.fire({
      title: `Are you sure you want to delete ${list_name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api_url.post("/delete/payroll-lists", {
            payroll_list_id: payroll_id,
          });
          if (response.status === 200) {
            fetchPayrollLists();
          }
        } catch (error) {
          console.error("Error deleting payroll list:", error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  const handlePayrollNameClick = (
    payroll_id,
    list_name,
    description,
    created_date,
    status,
    navigate
  ) => {
    console.log("Payroll name clicked");
  };
  return (
    <div className="p-4 relative overflow-x-auto sm:rounded-lg">
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
            placeholder="Search Payroll name/ID"
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
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 animate__animated animate__fadeIn">
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
          {payrollLists.length > 0 ? (
            payrollLists.map((product) => {
              const formattedDate = moment(product.created_date).format(
                "YYYY-MM-DD hh:mm:ss A"
              );

              return (
                <tr
                  key={product.payroll_list_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{product.payroll_list_id}</td>

                  <th
                    scope="row"
                    class="px-6 py-4 hover:underline cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      to={`/PayrollContent/${product.payroll_list_id}/${product.list_name}`}
                      className="hover:underline cursor-pointer"
                    >
                      {product.list_name}
                    </Link>
                  </th>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{formattedDate}</td>

                  <td className="px-6 py-4">
                    <div
                      className={`status px-4 py-2 text-white text-xs rounded-md whitespace-nowrap w-fit ${
                        product.status === 1 ? "bg-[#62cb31]" : "bg-red-500"
                      }`}
                    >
                      {product.status === 1 ? "Active" : "Inactive"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          handleEditClick(
                            product.payroll_list_id,
                            product.list_name,
                            product.description,
                            product.created_date,
                            product.status
                          )
                        }
                        className="edit p-1 hover:bg-gray-300 rounded-full font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="blue"
                          class="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                      {editPayrollLists && (
                        <EditPayrollLists
                          setEditPayrollLists={setEditPayrollLists}
                          editPayrollLists={editPayrollLists}
                          editValue={editValue}
                          setEditValue={setEditValue}
                          fetchPayrollLists={fetchPayrollLists}
                        />
                      )}
                      <button
                        onClick={() =>
                          handleDelete(
                            product.payroll_list_id,
                            product.list_name
                          )
                        }
                        className="delete font-medium hover:bg-gray-300 rounded-full text-red-600 dark:text-red-500 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                <div className="flex justify-center gap-1 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <h1>No Payroll Lists Available</h1>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
