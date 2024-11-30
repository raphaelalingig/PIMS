import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import api_url from "../../../../../components/api_url";
import { useParams } from "react-router-dom";

export default function AddEmployee({
  setIsAddEmployeeModalOpen,
  isAddEmployeeModalOpen,
  fetchData,
  isJobPositionModalOpen,
  setIsJobPositionModalOpen,
}) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [basicPay, setBasicPay] = useState(0);
  const [salaryType, setSalaryType] = useState(0);

  const [salary, setSalary] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("0");
  const [isNighDifferential, setIsNighDifferential] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  const [isDeductions, setIsDeductions] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [nightDifferentialHours, setNightDifferentialHours] = useState(0);
  const [deductionsReasons, setDeductionsReasons] = useState("0");
  const [deductionsAmount, setDeductionsAmount] = useState(0);

  const [salaryDate, setSalaryDate] = useState(new Date());
  const [jobPositions, setJobPositions] = useState([]);

  const { id, payrollName } = useParams();
  console.log("ID from add employee: ", id);

  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        const response = await api_url.post("/job-positions", {
          payroll_list_id: id,
        });

        if (response.status === 200) {
          setJobPositions(response.data);
        }
      } catch (error) {
        console.error("Error fetching job positions:", error);
      }
    };

    fetchJobPositions();
  }, [id]);

  useEffect(() => {
    let newDate = new Date();

    if (salaryType === 1) {
      newDate.setHours(newDate.getHours() + 8);
    } else if (salaryType === 2) {
      newDate.setDate(newDate.getDate() + 15);
    } else if (salaryType === 3) {
      newDate.setDate(newDate.getDate() + 30);
    }

    setSalaryDate(newDate);
  }, [salaryType]);

  const calculateSalary = ({
    basicPay,
    salaryType,
    isOvertime,
    overtimeHours,
    isNighDifferential,
    nightDifferentialHours,
    isDeductions,
    deductionsAmount,
  }) => {
    // Initialize base salary based on salary type
    let totalSalary = 0;
    const hourlyRate = basicPay / 8; // Daily rate divided by 8 hours

    // Calculate base salary based on salary type
    switch (salaryType) {
      case 1: // Daily
        totalSalary = basicPay;
        break;
      case 2: // Every 15 Days
        totalSalary = basicPay * 15;
        break;
      case 3: // Monthly
        totalSalary = basicPay * 30;
        break;
      default:
        totalSalary = 0;
    }

    // Calculate overtime if enabled
    if (isOvertime && overtimeHours > 0) {
      const overtimePay = hourlyRate * 1.5 * overtimeHours;
      totalSalary += overtimePay;
    }

    // Calculate night differential if enabled
    if (isNighDifferential && nightDifferentialHours > 0) {
      // Night differential is 110% of hourly rate
      const nightDiffRate = hourlyRate * 1.1;
      const nightDiffPay = nightDiffRate * nightDifferentialHours;
      totalSalary += nightDiffPay;
    }

    // Apply deductions if enabled
    if (isDeductions && deductionsAmount > 0) {
      totalSalary -= deductionsAmount;
    }

    return totalSalary;
  };

  useEffect(() => {
    const newSalary = calculateSalary({
      basicPay: Number(basicPay),
      salaryType,
      isOvertime,
      overtimeHours: Number(overtimeHours),
      isNighDifferential,
      nightDifferentialHours: Number(nightDifferentialHours),
      isDeductions,
      deductionsAmount: Number(deductionsAmount),
    });

    setSalary(newSalary);
  }, [
    basicPay,
    salaryType,
    isOvertime,
    overtimeHours,
    isNighDifferential,
    nightDifferentialHours,
    isDeductions,
    deductionsAmount,
  ]);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to add this employee?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1A56DB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const formatDate = (date) => {
          return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(date));
        };
        const newEmployee = {
          id: Date.now(), // Add a unique ID for each employee
          name,
          position,
          mobileNumber,
          basicPay,
          salaryType,
          salary,
          salaryDate: formatDate(salaryDate),
          paymentStatus,
          nightDifferential: {
            enabled: isNighDifferential,
            hours: nightDifferentialHours,
          },
          overtime: {
            enabled: isOvertime,
            hours: overtimeHours,
          },
          deductions: {
            enabled: isDeductions,
            reasons: deductionsReasons,
            amount: deductionsAmount,
          },
        };

        // Get existing employees from sessionStorage
        const existingEmployees =
          JSON.parse(sessionStorage.getItem("employeeData")) || [];

        // Add new employee to the array
        const updatedEmployees = [...existingEmployees, newEmployee];

        // Store updated array back in sessionStorage
        sessionStorage.setItem(
          "employeeData",
          JSON.stringify(updatedEmployees)
        );
        fetchData();
        setIsAddEmployeeModalOpen(false);
        console.log("Stored employee data:", updatedEmployees);
      }
    });

    // Create the new employee object

    // Optional: Keep the console.logs for debugging
    console.log("Name: ", name);
    console.log("Position: ", position);
    console.log("Mobile Number: ", mobileNumber);
    console.log("Basic Pay: ", basicPay);
    console.log("Salary Type ", salaryType);
    console.log("Salary: ", salary);
    console.log("Payment Status: ", paymentStatus);
    console.log(
      "Night Differential + hours + rate ",
      isNighDifferential,
      nightDifferentialHours
    );
    console.log("Overtime + hours + rate ", isOvertime, overtimeHours);
    console.log(
      "Deductions + Reasons + Amount ",
      isDeductions,
      deductionsReasons,
      deductionsAmount
    );
  };

  const handleClickAddJobPosition = () => {
    setIsAddEmployeeModalOpen(false);
    setIsJobPositionModalOpen(true);
  };
  return (
    <>
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        class="animate__animated animate__fadeIn flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-6xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Add Employee
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setIsAddEmployeeModalOpen(false)}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <form class="p-4 md:p-5" onSubmit={handleAddEmployee}>
              <div className="grid gap-4 mb-4 sm:grid-cols-3 border-b pb-4">
                <div>
                  {/* class="col-span-2" */}
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type employee name"
                    required=""
                  />
                </div>
                <div>
                  {/* class="col-span-2" */}
                  <label
                    for="jobPositions"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Position/Job Title{" "}
                    <span
                      className="text-red-500 cursor-pointer p-1 border-black dark:border-white border rounded-md text-xs"
                      onClick={handleClickAddJobPosition}
                    >
                      Add Job Position
                    </span>
                  </label>
                  <select
                    id="jobPositions"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected>
                      Select Job Position
                    </option>
                    {jobPositions.map((job) => (
                      <option
                        key={job.job_position_id}
                        value={job.job_position_id}
                      >
                        {job.title} - {job.salary}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="">
                  <label
                    for="Mobile Number"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    name="Mobile Number"
                    id="Mobile Number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter 11 digit mobile number"
                    required=""
                  />
                </div>
                <div class="">
                  <label
                    for="basicPay"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Basic Pay
                  </label>
                  <input
                    type="number"
                    name="basicPay"
                    id="basicPay"
                    onChange={(e) => setBasicPay(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                    placeholder="Basic salary per day"
                  />
                </div>
                <div class="">
                  <label
                    for="salaryType"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Salary Type
                  </label>
                  <select
                    id="salaryType"
                    name="salaryType"
                    onChange={(e) => setSalaryType(Number(e.target.value))}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected={0}>Select salary type</option>
                    <option value={1}>Daily</option>
                    <option value={2}>Every 15 Days</option>
                    <option value={3}>Monthly</option>
                  </select>
                </div>

                <div class="">
                  <label
                    for="Payment Status"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Payment Status
                  </label>
                  <select
                    id="Payment Status"
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected="0">Select status</option>
                    <option value="1">Paid</option>
                    <option value="2">Pending</option>
                    <option value="3">On Hold</option>
                  </select>
                </div>

                <div className="">
                  <label
                    htmlFor="salaryDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Salary Date
                  </label>
                  <DatePicker
                    selected={salaryDate}
                    onChange={(date) => setSalaryDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    customInput={
                      <input
                        type="text"
                        name="salaryDate"
                        id="salaryDate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      />
                    }
                  />
                </div>

                {/* <div class="col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div> */}
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-3 border-b pb-4">
                <div class="flex items-center">
                  <input
                    id="overtime-checkbox"
                    type="checkbox"
                    checked={isOvertime}
                    onChange={(e) => setIsOvertime(e.target.checked)}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="overtime-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Add Overtime
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="nightdifferential-checkbox"
                    type="checkbox"
                    checked={isNighDifferential}
                    onChange={(e) => setIsNighDifferential(e.target.checked)}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="nightdifferential-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Add Night Differential
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    id="deductions-checkbox"
                    type="checkbox"
                    checked={isDeductions}
                    onChange={(e) => setIsDeductions(e.target.checked)}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="deductions-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Add Deductions
                  </label>
                </div>
              </div>
              <div
                className={`grid gap-4 mb-4 sm:grid-cols-3 pb-4 ${
                  isNighDifferential || isOvertime || isDeductions
                    ? "border-b"
                    : ""
                }`}
              >
                {isOvertime && (
                  <div>
                    <label
                      for="overtime"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Overtime{" "}
                      <span className="text-xs">(1.5× hourly rate)</span>
                    </label>
                    <div className="flex gap-4">
                      <div>
                        {/* class="col-span-2" */}
                        <label
                          for="overtimeNumberofHours"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Number of Hours
                        </label>
                        <input
                          type="number"
                          name="overtimeNumberofHours"
                          id="overtimeNumberofHours"
                          onChange={(e) => setOvertimeHours(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {isNighDifferential && (
                  <div>
                    <label
                      for="differentialrate"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Night Differential{" "}
                      <span className="text-xs">
                        (10% additional compensation)
                      </span>
                    </label>
                    <div className="flex gap-4">
                      {" "}
                      <div>
                        {/* class="col-span-2" */}
                        <label
                          for="nightDifferentialNumberofHours"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Number of Hours
                        </label>
                        <input
                          type="number"
                          name="nightDifferentialNumberofHours"
                          id="nightDifferentialNumberofHours"
                          onChange={(e) =>
                            setNightDifferentialHours(e.target.value)
                          }
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {isDeductions && (
                  <div>
                    <label
                      for="deductions"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Deductions
                    </label>
                    <div className="flex gap-4">
                      {" "}
                      <div>
                        {/* class="col-span-2" */}
                        <label
                          for="setDeductionsReasons"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Reasons
                        </label>
                        <input
                          type="text"
                          name="setDeductionsReasons"
                          id="setDeductionsReasons"
                          onChange={(e) => setDeductionsReasons(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div>
                        {/* class="col-span-2" */}
                        <label
                          for="deductionRate"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Total Amount
                        </label>
                        <input
                          type="text"
                          name="deductionRate"
                          id="deductionRate"
                          onChange={(e) => setDeductionsAmount(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-3 border-b pb-4">
                {" "}
                <div class="">
                  <label
                    for="Salary"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Salary
                  </label>
                  <input
                    disabled
                    type="number"
                    name="salary"
                    id="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => setIsAddEmployeeModalOpen(false)}
                  class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="text-white inline-flex items-center bg-[#009D01] hover:bg-[#007B01] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-[#009D01] dark:hover:bg-[#007B01] dark:focus:ring-green-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
