import React from "react";
import PieChart from "./PieChart";

export default function BoxReports({ payrollName }) {
  return (
    <>
      <div className="flex mt-4 justify-center gap-3">
        <div className="grid gap-4 mb-4 sm:grid-cols-2 pb-4">
          <div
            className="flex justify-center p-4 flex-col bg-white dark:bg-gray-700 rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base dark:text-white ">
              Payroll Name:
            </h1>
            <h1 className="font-bold text-2xl py-2 dark:text-white">
              {payrollName}
            </h1>
          </div>
          <div
            className="p-4 bg-white dark:bg-gray-700 rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base dark:text-white">
              Total Salaries
            </h1>
            <h1 className="font-bold text-3xl py-2 dark:text-white">₱</h1>
            <h1 className="font-light text-sm dark:text-white">Pesos</h1>
          </div>
          <div
            className="p-4 bg-white dark:bg-gray-700 rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base dark:text-white ">
              Total Employees
            </h1>
            <h1 className="font-bold text-3xl py-2 dark:text-white"></h1>
            <h1 className="font-light text-sm dark:text-white">Employees</h1>
            <div className="space-y-2"></div>
          </div>
          <div
            className="p-4 bg-white dark:bg-gray-700 rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base dark:text-white">
              Position/Job Title
            </h1>
            <div className="space-y-2"></div>
          </div>
        </div>
        <div>
          <PieChart />
        </div>
      </div>
    </>
  );
}