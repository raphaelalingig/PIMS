import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEmployee({
  setIsAddEmployeeModalOpen,
  isAddEmployeeModalOpen,
}) {
  const [name, setName] = useState("");
  const [postition, setPosition] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [basicSalary, setBasicSalary] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [salary, setSalary] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("0");
  const [isNighDifferential, setIsNighDifferential] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  const [isDeductions, setIsDeductions] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [overtimeRate, setOvertimeRate] = useState(0);
  const [nightDifferentialHours, setNightDifferentialHours] = useState(0);
  const [nightDifferentialRate, setNightDifferentialRate] = useState(0);
  const [deductionsHours, setDeductionsHours] = useState(0);
  const [deductionsRate, setDeductionsRate] = useState(0);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    console.log("Name: ", name);
    console.log("Position: ", postition);
    console.log("Mobile Number: ", mobileNumber);
    console.log("Basic Salary: ", basicSalary);
    console.log("Start Date: ", startDate);
    console.log("Salary: ", salary);
    console.log("Payment Status: ", paymentStatus);
    console.log(
      "Night Differential + hours + rate ",
      isNighDifferential,
      nightDifferentialHours,
      nightDifferentialRate
    );
    console.log(
      "Overtime + hours + rate ",
      isOvertime,
      overtimeHours,
      overtimeRate
    );
    console.log(
      "Deductions + hours + rate ",
      isDeductions,
      deductionsHours,
      deductionsRate
    );

    setIsAddEmployeeModalOpen(false);
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
        class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Position/Job Title
                  </label>
                  <input
                    type="text"
                    name="Position"
                    id="name"
                    onChange={(e) => setPosition(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    required=""
                  />
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
                    for="Basic Salary"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Basic Salary
                  </label>
                  <input
                    type="number"
                    name="Mobile Number"
                    id="Basic Salary"
                    onChange={(e) => setBasicSalary(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Basic salary per day"
                    required=""
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={
                      <input
                        type="text"
                        name="startDate"
                        id="startDate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      />
                    }
                  />
                </div>
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
                    name="Mobile Number"
                    id="Salary"
                    onChange={(e) => setSalary(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
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
                      Overtime
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
                          type="text"
                          name="overtimeNumberofHours"
                          id="overtimeNumberofHours"
                          onChange={(e) => setOvertimeHours(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div>
                        {/* class="col-span-2" */}
                        <label
                          for="overtimeRate"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rate (%)
                        </label>
                        <input
                          type="text"
                          name="overtimeRate"
                          id="overtimeRate"
                          onChange={(e) => setOvertimeRate(e.target.value)}
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
                      Night Differential
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
                          type="text"
                          name="nightDifferentialNumberofHours"
                          id="nightDifferentialNumberofHours"
                          onChange={(e) =>
                            setNightDifferentialHours(e.target.value)
                          }
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div>
                        {/* class="col-span-2" */}
                        <label
                          for="differentialrate"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rate (%)
                        </label>
                        <input
                          type="text"
                          name="differentialrate"
                          id="differentialrate"
                          onChange={(e) =>
                            setNightDifferentialRate(e.target.value)
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
                          for="deductionsNumberofHours"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Number of Hours
                        </label>
                        <input
                          type="text"
                          name="deductionsNumberofHours"
                          id="deductionsNumberofHours"
                          onChange={(e) => setDeductionsHours(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div>
                        {/* class="col-span-2" */}
                        <label
                          for="deductionRate"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rate (%)
                        </label>
                        <input
                          type="text"
                          name="deductionRate"
                          id="deductionRate"
                          onChange={(e) => setDeductionsRate(e.target.value)}
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
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
