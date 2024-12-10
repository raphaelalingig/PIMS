import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import BoxReports from "./Reports/BoxReports";
import AddJobPositions from "./Actions/JobPositions";
import AddEmployee from "./Actions/AddEmployee";
import api_url from "../../../../components/api_url";
import EditEmployee from "./Actions/EditEmployee";
import { Bounce, toast, ToastContainer } from "react-toastify";
import PieChart from "./Reports/PieChart";
import ShareLink from "./Actions/ShareLink";
import exportToExcel from "../../../../hooks/ExportToExcel";
import useEmployeeSearch from "../../../../hooks/useEmployeeSearch";

export default function PayrollContent() {
  const { id, name } = useParams();

  const [isJobPositionModalOpen, setIsJobPositionModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);

  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [payrollEmployees, setPayrollEmployees] = useState([]);
  const [shareToken, setShareToken] = useState(null);
  const { searchTerm, filteredEmployees, handleSearchChange } =
    useEmployeeSearch(payrollEmployees);
  const [editEmployeeDetails, setEditEmployeeDetails] = useState({
    employee_id: 0,
    employee_name: "",
    job_position: "",
    mobile_number: 0,
    basic_pay: 0,
    salary_date: "",
    payment_status: 0,
    salary_type: 0,
    total_pay: 0,
    overtime_status: 0,
    nightDifferential_status: 0,
    deductions_status: 0,
    overtime_hours: 0,
    nightDifferential_hours: 0,
    deductions_amount: 0,
    deduction_reason: "",
    job_position_id: 0,
  });

  const [user_id, setUser_id] = useState("");

  const theme = localStorage.getItem("color-theme");

  console.log("ID: ", id);
  console.log("Name: ", name);

  useEffect(() => {
    fetchPayrollEMployees();
  }, [id]);

  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));

    if (userCredentials?.Data?.user_id) {
      setUser_id(userCredentials.Data.user_id);
    }
  }, []);

  const fetchPayrollEMployees = async () => {
    try {
      const response = await api_url.post("/show-payroll-employees", {
        payroll_list_id: id,
      });

      if (response && response.status === 200) {
        console.log("Payroll employees:", response.data.data);
        setPayrollEmployees(response.data.data);
      }
    } catch (error) {}
  };

  const handleEditEmployee = (
    employee_id,
    employee_name,
    job_position,
    mobile_number,
    basic_pay,
    salary_date,
    payment_status,
    salary_type,
    total_pay,
    overtime_status,
    nightDifferential_status,
    deductions_status,
    overtime_hours,
    nightDifferential_hours,
    deductions_amount,
    deduction_reason,
    job_position_id
  ) => {
    setIsEditEmployeeModalOpen(true);
    setEditEmployeeDetails({
      employee_id: employee_id,
      employee_name: employee_name,
      job_position: job_position,
      mobile_number: mobile_number,
      basic_pay: basic_pay,
      salary_date: salary_date,
      payment_status: payment_status,
      salary_type: salary_type,
      total_pay: total_pay,
      overtime_status: overtime_status,
      nightDifferential_status: nightDifferential_status,
      deductions_status: deductions_status,
      overtime_hours: overtime_hours,
      nightDifferential_hours: nightDifferential_hours,
      deductions_amount: deductions_amount,
      deduction_reason: deduction_reason,
      job_position_id: job_position_id,
    });
  };

  const handleDeleteEmployee = async (
    employee_id,
    payroll_list_id,
    employee_name
  ) => {
    console.log("Employee ID:", employee_id);
    console.log("Payroll List ID:", payroll_list_id);

    try {
      const response = await api_url.post("/delete-payroll-employee", {
        employee_id: employee_id,
        payroll_list_id: payroll_list_id,
      });

      if (response.status === 200) {
        fetchPayrollEMployees();
        toast.success(`${employee_name} Employee deleted successfully!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${theme == "dark" ? "dark" : "light"}`,
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log("Error in deleting employee:", error);
    }
  };

  const handleShareLink = async (employee_id) => {
    try {
      const response = await api_url.post("/generate-share-token", {
        user_id,
        employee_id,
      });
      if (response.status === 200) {
        console.log(response.data);
        setShareToken(response.data.share_token);
      }
    } catch (error) {}

    setIsShareLinkOpen(true);
  };
  return (
    <div className="bg-[#F4F6FA] dark:bg-gray-900 min-h-screen ">
      <Navbar />
      <div className="flex justify-center items-center gap-3">
        <div>
          <BoxReports id={id} payrollName={name} payroll ID={id} />
        </div>
        <div>
          <PieChart payrollEmployees={payrollEmployees} />
        </div>
      </div>
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
                value={searchTerm}
                onChange={handleSearchChange}
                class="block mt-1 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search employee name/ID"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              class="gap-1 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 border border-black focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => exportToExcel(payrollEmployees)}
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Export to Excel
            </button>
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
                fetchPayrollEMployees={fetchPayrollEMployees}
              />
            )}
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table class="animate__animated animate__fadeIn border border-black dark:border-white rounded-md w-full text-sm text-left rtl:text-right text-black dark:text-white">
            <thead class="text-xs text-black dark:text-white uppercase bg-white dark:bg-gray-700 ">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Employee Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Position/Job Title
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Mobile Number
                </th>

                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Basic Pay
                </th>

                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Salary Date
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Earnings and Deductions
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Salary
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 border border-black dark:border-white"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-xs animate__animated animate__fadeIn">
              {isLoading ? (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    <div role="status" className="flex justify-center">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => {
                  const formatDate = (dateString) => {
                    try {
                      if (
                        typeof dateString === "string" &&
                        dateString.includes(",")
                      ) {
                        return dateString;
                      }

                      const date = new Date(dateString);

                      if (isNaN(date.getTime())) {
                        return "Invalid Date";
                      }

                      const formattedDate = new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(date);

                      const formattedTime = new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }).format(date);

                      return (
                        <>
                          {formattedDate}
                          <br />
                        </>
                      );
                    } catch (error) {
                      console.error("Date formatting error:", error);
                      return "Invalid Date";
                    }
                  };

                  const additionalPayments = [
                    employee.overtime_status
                      ? `Overtime: ${employee.overtime_hours} hrs`
                      : null,
                    employee.nightDifferential_status
                      ? `Night Differential: ${employee.nightDifferential_hours} hrs`
                      : null,
                    employee.deductions_status
                      ? `Deductions: ₱-${employee.deductions_amount} (${employee.deduction_reason})`
                      : null,
                  ]
                    .filter(Boolean)
                    .join("\n");

                  return (
                    <tr
                      key={employee.employee_id}
                      className="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-white even:dark:bg-gray-800 bg-white border-b border-black dark:border-white dark:bg-gray-800"
                    >
                      <td className="px-6 py-4 border-r border-black dark:border-white border-r border-black dark:border-white">
                        {employee.employee_id}
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white">
                        {employee.employee_name}
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white">
                        {employee.job_position}
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white">
                        {employee.mobile_number}
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white whitespace-nowrap">
                        ₱ {employee.basic_pay}
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white">
                        {formatDate(employee.salary_date)}
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white">
                        <div
                          className={`status px-4 w-fit py-1 text-xs rounded-md whitespace-nowrap ${
                            employee.payment_status == 1
                              ? "text-white"
                              : employee.payment_status == 2
                              ? "bg-blue-300 text-blue-900"
                              : employee.payment_status == 3 ||
                                employee.payment_status == 0
                              ? "bg-red-300 text-red-900"
                              : ""
                          }`}
                          style={
                            employee.payment_status == 1
                              ? { backgroundColor: "#62cb31" }
                              : {}
                          }
                        >
                          {employee.payment_status == 1
                            ? "Paid"
                            : employee.payment_status == 2
                            ? "Pending"
                            : employee.payment_status == 3
                            ? "On Hold"
                            : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white">
                        {additionalPayments || "None"}
                      </td>
                      <td className="px-6 py-4 border-r border-black dark:border-white whitespace-nowrap">
                        ₱ {employee.total_pay}
                      </td>

                      <td className="px-6 py-4 border-r border-black dark:border-white">
                        <div className="flex gap-3">
                          <div
                            className="editIcon"
                            onClick={() =>
                              handleEditEmployee(
                                employee.employee_id,
                                employee.employee_name,
                                employee.job_position,
                                employee.mobile_number,
                                employee.basic_pay,
                                employee.salary_date,
                                employee.payment_status,
                                employee.salary_type,
                                employee.total_pay,
                                employee.overtime_status,
                                employee.nightDifferential_status,
                                employee.deductions_status,
                                employee.overtime_hours,
                                employee.nightDifferential_hours,
                                employee.deductions_amount,
                                employee.deduction_reason,
                                employee.job_position_id
                              )
                            }
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
                          </div>
                          {isEditEmployeeModalOpen && (
                            <EditEmployee
                              isEditEmployeeModalOpen={isEditEmployeeModalOpen}
                              setIsEditEmployeeModalOpen={
                                setIsEditEmployeeModalOpen
                              }
                              editEmployeeDetails={editEmployeeDetails}
                              setEditEmployeeDetails={setEditEmployeeDetails}
                              fetchPayrollEMployees={fetchPayrollEMployees}
                              isJobPositionModalOpen={isJobPositionModalOpen}
                              setIsJobPositionModalOpen={
                                setIsJobPositionModalOpen
                              }
                            />
                          )}

                          <div
                            className="deleteIcon"
                            onClick={() =>
                              handleDeleteEmployee(
                                employee.employee_id,
                                employee.payroll_list_id,
                                employee.employee_name
                              )
                            }
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
                          </div>

                          <div
                            className="share"
                            onClick={() =>
                              handleShareLink(employee.employee_id)
                            }
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
                                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                              />
                            </svg>
                            {isShareLinkOpen && (
                              <ShareLink
                                isShareLinkOpen={isShareLinkOpen}
                                setIsShareLinkOpen={setIsShareLinkOpen}
                                shareToken={shareToken}
                                setShareToken={setShareToken}
                              />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
