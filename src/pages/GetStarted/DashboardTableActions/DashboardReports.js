import React from "react";
import PaymentStatusChart from "./PaymentStatusChart";

export default function DashboardReports({ dashboardMetrics }) {
  console.log("Dashboard Metrics: ", dashboardMetrics);
  return (
    <>
      <div className="flex justify-center gap-3">
        <div className="grid gap-4 mb-4 sm:grid-cols-2 border-b pb-4">
          <div
            className="p-4 bg-white rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base ">Total Employees</h1>
            <h1 className="font-bold text-3xl py-2">
              {dashboardMetrics.totalEmployees}
            </h1>
            <h1 className="font-light text-sm">Employees</h1>
          </div>
          <div
            className="p-4 bg-white rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base ">Total Salaries</h1>
            <h1 className="font-bold text-3xl py-2">
              ₱{dashboardMetrics.totalSalary.toLocaleString()}
            </h1>
            <h1 className="font-light text-sm">Pesos</h1>
          </div>
          <div
            className="p-4 bg-white rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base ">Top Employees Salaries</h1>
            <div className="space-y-2">
              {dashboardMetrics.top3Salaries.map((employee, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">
                    {index + 1}. {employee.name}
                  </span>
                  <span className="text-gray-600 text-sm">
                    ₱
                    {employee.salary.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>
            <h1 className="font-light text-sm">Employees</h1>
          </div>
          <div
            className="p-4 bg-white rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base ">Position/Job Title</h1>
            <div className="space-y-2">
              {dashboardMetrics.top3Positions.map((positionData, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">
                    {index + 1}. {positionData.position}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {positionData.count} employee
                    {positionData.count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <PaymentStatusChart
            paymentStatusTotals={dashboardMetrics.paymentStatusTotals}
          />
        </div>
      </div>
    </>
  );
}
