import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import api_url from "../../../../../components/api_url";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function EditEmployee({
  fetchPayrollEMployees,
  isEditEmployeeModalOpen,
  setIsEditEmployeeModalOpen,
  editEmployeeDetails,
  setEditEmployeeDetails,
  isJobPositionModalOpen,
  setIsJobPositionModalOpen,
}) {
  const [jobPositions, setJobPositions] = useState([]);
  const theme = localStorage.getItem("color-theme");

  const { id, payrollName } = useParams();
  console.log("ID from add employee: ", id);

  console.log("Edit employee details: ", editEmployeeDetails);

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

    if (editEmployeeDetails.salary_type === 1) {
      newDate.setHours(newDate.getHours() + 8);
    } else if (editEmployeeDetails.salary_type === 2) {
      newDate.setDate(newDate.getDate() + 15);
    } else if (editEmployeeDetails.salary_type === 3) {
      newDate.setDate(newDate.getDate() + 30);
    }

    setEditEmployeeDetails((prevDetails) => ({
      ...prevDetails,
      salary_date: newDate,
    }));
  }, [editEmployeeDetails.salary_type]);

  const calculateUpdatedSalary = ({
    basicPay,
    salaryType,
    isOvertime,
    overtimeHours,
    isNightDiff,
    nightDiffHours,
    hasDeductions,
    deductionsAmount,
  }) => {
    let totalSalary = 0;
    const hourlyRate = basicPay / 8;

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

    // Add overtime pay if applicable
    if (isOvertime && overtimeHours > 0) {
      const overtimePay = hourlyRate * 1.5 * overtimeHours;
      totalSalary += overtimePay;
    }

    // Add night differential if applicable
    if (isNightDiff && nightDiffHours > 0) {
      const nightDiffPay = hourlyRate * 1.1 * nightDiffHours;
      totalSalary += nightDiffPay;
    }

    // Subtract deductions if applicable
    if (hasDeductions && deductionsAmount > 0) {
      totalSalary -= deductionsAmount;
    }

    return totalSalary;
  };

  useEffect(() => {
    const updatedTotalPay = calculateUpdatedSalary({
      basicPay: Number(editEmployeeDetails.basic_pay),
      salaryType: Number(editEmployeeDetails.salary_type),
      isOvertime: Boolean(editEmployeeDetails.overtime_status),
      overtimeHours: Number(editEmployeeDetails.overtime_hours),
      isNightDiff: Boolean(editEmployeeDetails.nightDifferential_status),
      nightDiffHours: Number(editEmployeeDetails.nightDifferential_hours),
      hasDeductions: Boolean(editEmployeeDetails.deductions_status),
      deductionsAmount: Number(editEmployeeDetails.deductions_amount),
    });

    setEditEmployeeDetails((prev) => ({
      ...prev,
      total_pay: updatedTotalPay,
    }));
  }, [
    editEmployeeDetails.basic_pay,
    editEmployeeDetails.salary_type,
    editEmployeeDetails.overtime_status,
    editEmployeeDetails.overtime_hours,
    editEmployeeDetails.nightDifferential_status,
    editEmployeeDetails.nightDifferential_hours,
    editEmployeeDetails.deductions_status,
    editEmployeeDetails.deductions_amount,
  ]);

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for API submission
      const employeeData = {
        employee_id: editEmployeeDetails.employee_id,
        payroll_list_id: editEmployeeDetails.payroll_list_id,
        employee_name: editEmployeeDetails.employee_name,
        job_position: editEmployeeDetails.job_position,
        mobile_number: editEmployeeDetails.mobile_number,
        basic_pay: Number(editEmployeeDetails.basic_pay),
        salary_type: Number(editEmployeeDetails.salary_type),
        payment_status: Number(editEmployeeDetails.payment_status),
        overtime_status: editEmployeeDetails.overtime_status ? 1 : 0,
        overtime_hours: editEmployeeDetails.overtime_status
          ? Number(editEmployeeDetails.overtime_hours)
          : 0,
        nightDifferential_status: editEmployeeDetails.nightDifferential_status
          ? 1
          : 0,
        nightDifferential_hours: editEmployeeDetails.nightDifferential_status
          ? Number(editEmployeeDetails.nightDifferential_hours)
          : 0,
        deductions_status: editEmployeeDetails.deductions_status ? 1 : 0,
        deduction_reason: editEmployeeDetails.deductions_status
          ? editEmployeeDetails.deduction_reason
          : "",
        deductions_amount: editEmployeeDetails.deductions_status
          ? Number(editEmployeeDetails.deductions_amount)
          : 0,
        total_pay: editEmployeeDetails.total_pay,
        salary_date:
          editEmployeeDetails.salary_date instanceof Date
            ? editEmployeeDetails.salary_date.toISOString().split("T")[0]
            : editEmployeeDetails.salary_date,
        job_position_id: Number(editEmployeeDetails.job_position_id),
      };

      // Make the API call
      const response = await api_url.put(
        "/edit-payroll-employee",
        employeeData
      );

      if (response.data.success) {
        // Show success message
        toast.success(
          `${editEmployeeDetails.employee_name} Employee added successfully!`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: `${theme == "dark" ? "dark" : "light"}`,
            transition: Bounce,
          }
        );

        // Close the modal
        setIsEditEmployeeModalOpen(false);

        // Refresh the employee list (assuming you have a function for this)
        fetchPayrollEMployees(); // You'll need to implement this function to refresh the list
      } else {
        // Show error message

        toast.warn(
          `Failed to update employee ${editEmployeeDetails.employee_name}!`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: `${theme == "dark" ? "dark" : "light"}`,
            transition: Bounce,
          }
        );
      }
    } catch (error) {
      console.error("Error updating employee:", error);

      toast.error(`An error occurred while updating the employee!`, {
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
  };

  const handleClickAddJobPosition = () => {
    setIsEditEmployeeModalOpen(false);
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
                Edit Employee
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => setIsEditEmployeeModalOpen(false)}
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
            <form class="p-4 md:p-5" onSubmit={handleUpdateEmployee}>
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
                    value={editEmployeeDetails.employee_name}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        employee_name: e.target.value,
                      })
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type employee name"
                    required
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
                      className="text-black dark:text-white bg-gray-100 dark:bg-gray-600 cursor-pointer p-1 border-black dark:border-white border rounded-md text-xs"
                      onClick={handleClickAddJobPosition}
                    >
                      Add Job Position
                    </span>
                  </label>
                  <select
                    id="jobPositions"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      const selectedJob = jobPositions.find(
                        (job) =>
                          job.job_position_id === parseInt(e.target.value)
                      );
                      if (selectedJob) {
                        setEditEmployeeDetails({
                          ...editEmployeeDetails,
                          job_position_id: selectedJob.job_position_id, // Update job_position_id
                          job_position: selectedJob.title, // Update job_position title
                          basic_pay: selectedJob.salary, // Update basic_pay
                        });
                      }
                    }}
                    value={editEmployeeDetails.job_position_id} // Ensure this reflects the correct state
                    required
                  >
                    <option value="" disabled>
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
                    value={editEmployeeDetails.mobile_number}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        mobile_number: e.target.value,
                      })
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter 11 digit mobile number"
                    required
                  />
                </div>
                <div class="">
                  <label
                    for="basicPay"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Daily Wage
                  </label>
                  <input
                    type="number"
                    name="basicPay"
                    id="basicPay"
                    value={editEmployeeDetails.basic_pay}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        basic_pay: e.target.value,
                      })
                    }
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
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
                    value={editEmployeeDetails.salary_type}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        salary_type: e.target.value,
                      })
                    }
                    required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled selected>
                      Select salary type
                    </option>
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
                    value={editEmployeeDetails.payment_status}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        payment_status: e.target.value,
                      })
                    }
                    required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" selected>
                      Select status
                    </option>
                    <option value={1}>Paid</option>
                    <option value={2}>Pending</option>
                    <option value={3}>On Hold</option>
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
                    selected={editEmployeeDetails.salary_date}
                    onChange={(date) => {
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        salary_date: date,
                      });
                    }}
                    dateFormat="P"
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
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-3 border-b pb-4">
                <div class="flex items-center">
                  <input
                    id="overtime-checkbox"
                    type="checkbox"
                    checked={editEmployeeDetails.overtime_status}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        overtime_status: e.target.checked,
                      })
                    }
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
                    checked={editEmployeeDetails.nightDifferential_status}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        nightDifferential_status: e.target.checked,
                      })
                    }
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
                    checked={editEmployeeDetails.deductions_status}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        deductions_status: e.target.checked,
                      })
                    }
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
                  editEmployeeDetails.nightDifferential_status ||
                  editEmployeeDetails.overtime_status ||
                  editEmployeeDetails.deductions_status
                    ? "border-b"
                    : ""
                }`}
              >
                {editEmployeeDetails.overtime_status && (
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
                          value={editEmployeeDetails.overtime_hours}
                          onChange={(e) =>
                            setEditEmployeeDetails({
                              ...editEmployeeDetails,
                              overtime_hours: e.target.value,
                            })
                          }
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {editEmployeeDetails.nightDifferential_status && (
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
                          value={editEmployeeDetails.nightDifferential_hours}
                          onChange={(e) =>
                            setEditEmployeeDetails({
                              ...editEmployeeDetails,
                              nightDifferential_hours: e.target.value,
                            })
                          }
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {editEmployeeDetails.deductions_status && (
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
                          value={editEmployeeDetails.deduction_reason}
                          onChange={(e) =>
                            setEditEmployeeDetails({
                              ...editEmployeeDetails,
                              deduction_reason: e.target.value,
                            })
                          }
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
                          type="number"
                          name="deductionRate"
                          id="deductionRate"
                          value={editEmployeeDetails.deductions_amount}
                          onChange={(e) =>
                            setEditEmployeeDetails({
                              ...editEmployeeDetails,
                              deductions_amount: e.target.value,
                            })
                          }
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
                    value={editEmployeeDetails.total_pay}
                    onChange={(e) =>
                      setEditEmployeeDetails({
                        ...editEmployeeDetails,
                        total_pay: e.target.value,
                      })
                    }
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => setIsEditEmployeeModalOpen(false)}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
