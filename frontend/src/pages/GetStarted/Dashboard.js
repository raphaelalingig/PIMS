import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AddEmployee from "./DashboardTableActions/AddEmployee";
import Swal from "sweetalert2";
import EditEmployee from "./DashboardTableActions/EditEmployee";
import DashboardReports from "./DashboardTableActions/DashboardReports";

export default function Dashboard() {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalSalary: 0,
    totalEmployees: 0,
    paymentStatusTotals: {
      paid: 0,
      pending: 0,
      onHold: 0,
    },
  });

  const [editEmployeeDetails, setEditEmployeeDetails] = useState({
    id: 0,
    name: "",
    position: "",
    mobileNumber: 0,
    basicPay: 0,
    salaryType: 0,
    salary: 0,
    paymentStatus: 0,
    isNighDifferential: false,
    isOvertime: false,
    isDeductions: false,
    overtimeHours: 0,
    nightDifferentialHours: 0,
    deductionsReasons: 0,
    deductionsAmount: 0,
    salaryDate: new Date(),
  });

  useEffect(() => {
    const metrics = getDashboardMetrics(employeeData);
    setDashboardMetrics(metrics);
  }, [employeeData]);

  const filteredEmployees = employeeData.filter((employee) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchTermLower) ||
      employee.id.toString().includes(searchTermLower)
    );
  });

  const clearEmployeeData = () => {
    sessionStorage.removeItem("employeeData");
    console.log("Employee data cleared from session storage");
    fetchData();
  };

  useEffect(() => {
    // Simulate loading data

    fetchData();
  }, []);

  const fetchData = async () => {
    setisLoading(true);
    try {
      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = JSON.parse(sessionStorage.getItem("employeeData")) || [];
      setEmployeeData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setisLoading(false);
    }
  };

  const paymentStatus = {
    1: "Paid",
    2: "Pending",
    3: "On Hold",
  };

  const handleDeleteEmployee = (employeeId, employeeName) => {
    // Show confirmation dialog

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A56DB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEmployeeData = employeeData.filter(
          (employee) => employee.id !== employeeId
        );

        // Update state and session storage
        setEmployeeData(updatedEmployeeData);
        sessionStorage.setItem(
          "employeeData",
          JSON.stringify(updatedEmployeeData)
        );
        Swal.fire({
          title: "Deleted!",
          text: `Employee ${employeeName} has been deleted.`,
          icon: "success",
          confirmButtonColor: "#1A56DB",
        });
      }
    });
  };

  const handleEditEmployee = (
    id,
    name,
    position,
    mobileNumber,
    basicPay,
    salaryDate,
    paymentStatus,
    salaryType,
    salary,
    overtimeEnabled,
    nightDifferentialEnabled,
    deductionsEnabled,
    overtimeHours,
    nightDifferentialHours,
    deductionsAmount,
    deductionsReasons
  ) => {
    setIsEditEmployeeModalOpen(true);
    console.log("Edit employee modal open");
    setEditEmployeeDetails({
      id: id,
      name: name,
      position: position,
      mobileNumber: mobileNumber,
      basicPay: basicPay,
      salaryType: salaryType,
      salary: salary,
      paymentStatus: paymentStatus,
      isNighDifferential: nightDifferentialEnabled,
      isOvertime: overtimeEnabled,
      isDeductions: deductionsEnabled,
      overtimeHours: overtimeHours,
      nightDifferentialHours: nightDifferentialHours,
      deductionsReasons: deductionsReasons,
      deductionsAmount: deductionsAmount,
      salaryDate: salaryDate,
    });
  };

  const calculateTotalSalary = (employees) => {
    return employees.reduce((total, employee) => {
      // Convert salary to number in case it's stored as string
      const salary = Number(employee.salary) || 0;
      return total + salary;
    }, 0);
  };

  const getTotalEmployees = (employees) => {
    return employees.length;
  };

  const calculatePaymentStatusTotals = (employees) => {
    const statusTotals = {
      paid: 0,
      pending: 0,
      onHold: 0,
    };

    employees.forEach((employee) => {
      // Convert paymentStatus to string for comparison
      switch (employee.paymentStatus.toString()) {
        case "1":
          statusTotals.paid++;
          break;
        case "2":
          statusTotals.pending++;
          break;
        case "3":
          statusTotals.onHold++;
          break;
        default:
          break;
      }
    });

    return statusTotals;
  };
  const getTop3EmployeesBySalary = (employees) => {
    return employees
      .map((employee) => ({
        name: employee.name,
        salary: parseFloat(employee.salary),
        position: employee.position,
      }))
      .sort((a, b) => b.salary - a.salary)
      .slice(0, 3);
  };

  const getTop3Positions = (employees) => {
    // Count occurrences of each position
    const positionCounts = employees.reduce((acc, employee) => {
      acc[employee.position] = (acc[employee.position] || 0) + 1;
      return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(positionCounts)
      .map(([position, count]) => ({
        position,
        count,
      }))
      .sort((a, b) => b.count - a.count || a.position.localeCompare(b.position)) // Sort by count desc, then alphabetically
      .slice(0, 3);
  };

  const getDashboardMetrics = (employeeData) => {
    const totalSalary = calculateTotalSalary(employeeData);
    const totalEmployees = getTotalEmployees(employeeData);
    const paymentStatusTotals = calculatePaymentStatusTotals(employeeData);
    const top3Salaries = getTop3EmployeesBySalary(employeeData);
    const top3Positions = getTop3Positions(employeeData);

    return {
      totalSalary,
      totalEmployees,
      paymentStatusTotals,
      top3Salaries,
      top3Positions,
    };
  };

  return (
    <div className="bg-[#F4F6FA] h-full animate__animated animate__fadeIn">
      <Navbar />

      <main className="px-28 py-6">
        <DashboardReports dashboardMetrics={dashboardMetrics} />
        <div class="mt-4">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                class="gap-1 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 border border-black focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={clearEmployeeData}
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
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                Clear Data
              </button>
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
            </div>
            {isAddEmployeeModalOpen && (
              <AddEmployee
                setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen}
                isAddEmployeeModalOpen={isAddEmployeeModalOpen}
                fetchData={fetchData}
              />
            )}
          </div>
          <div className="relative overflow-x-auto">
            <table class="animate__animated animate__fadeIn border border-black dark:border-white rounded-md w-full text-sm text-left rtl:text-right text-black dark:text-white">
              <thead class="text-xs text-black dark:text-white uppercase bg-white dark:bg-gray-700 ">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Employee Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Position/Job Title
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Mobile Number
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Basic Pay
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Salary Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Additional Payment
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Salary
                  </th>
                  <th scope="col" class="px-6 py-3">
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
                            {formattedTime}
                          </>
                        );
                      } catch (error) {
                        console.error("Date formatting error:", error);
                        return "Invalid Date";
                      }
                    };

                    const additionalPayments = [
                      employee.overtime.enabled
                        ? `Overtime: ${employee.overtime.hours} hrs`
                        : null,
                      employee.nightDifferential.enabled
                        ? `Night Differential: ${employee.nightDifferential.hours} hrs`
                        : null,
                      employee.deductions.enabled
                        ? `Deductions: ₱-${employee.deductions.amount} (${employee.deductions.reasons})`
                        : null,
                    ]
                      .filter(Boolean)
                      .join("\n");

                    return (
                      <tr
                        key={employee.id}
                        className="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-white even:dark:bg-gray-800 bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{employee.id}</td>
                        <td className="px-6 py-4">{employee.name}</td>
                        <td className="px-6 py-4">{employee.position}</td>
                        <td className="px-6 py-4">{employee.mobileNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ₱: {employee.basicPay}
                        </td>
                        <td className="px-6 py-4">
                          {formatDate(employee.salaryDate)}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`status px-4 w-fit py-1 text-xs rounded-md whitespace-nowrap ${
                              employee.paymentStatus == 1
                                ? "text-white"
                                : employee.paymentStatus == 2
                                ? "bg-blue-300 text-blue-900"
                                : employee.paymentStatus == 3 ||
                                  employee.paymentStatus == 0
                                ? "bg-red-300 text-red-900"
                                : ""
                            }`}
                            style={
                              employee.paymentStatus == 1
                                ? { backgroundColor: "#62cb31" }
                                : {}
                            }
                          >
                            {paymentStatus[employee.paymentStatus]}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {additionalPayments || "None"}
                        </td>
                        <td className="px-6 py-4">{employee.salary}</td>

                        <td className="px-6 py-4">
                          <div className="flex">
                            <div
                              className="editIcon mr-2"
                              onClick={() =>
                                handleEditEmployee(
                                  employee.id,
                                  employee.name,
                                  employee.position,
                                  employee.mobileNumber,
                                  employee.basicPay,
                                  employee.salaryDate,
                                  employee.paymentStatus,
                                  employee.salaryType,
                                  employee.salary,
                                  employee.overtime.enabled,
                                  employee.nightDifferential.enabled,
                                  employee.deductions.enabled,
                                  employee.overtime.hours,
                                  employee.nightDifferential.hours,
                                  employee.deductions.amount,
                                  employee.deductions.reasons
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
                                isEditEmployeeModalOpen={
                                  isEditEmployeeModalOpen
                                }
                                setIsEditEmployeeModalOpen={
                                  setIsEditEmployeeModalOpen
                                }
                                editEmployeeDetails={editEmployeeDetails}
                                setEditEmployeeDetails={setEditEmployeeDetails}
                                fetchData={fetchData}
                              />
                            )}

                            <div
                              className="deleteIcon"
                              onClick={() =>
                                handleDeleteEmployee(employee.id, employee.name)
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
      </main>
    </div>
  );
}
