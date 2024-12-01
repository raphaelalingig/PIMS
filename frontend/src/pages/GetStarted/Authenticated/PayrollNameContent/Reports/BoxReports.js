import React, { useEffect, useState } from "react";
import api_url from "../../../../../components/api_url";
import { useParams } from "react-router-dom";

export default function BoxReports({ payrollName, payrollID }) {
  const [payrollContent, setPayrollContent] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [payrollEmployees, setPayrollEmployees] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  const { id, name } = useParams();

  useEffect(() => {
    const fetchPayrollEmployees = async () => {
      try {
        const response = await api_url.post("/show-payroll-employees", {
          payroll_list_id: id,
        });
        if (response.status === 200) {
          const employees = response.data.data;
          setPayrollEmployees(employees);

          // Calculate total salary
          const total = employees.reduce(
            (sum, employee) => sum + parseFloat(employee.total_pay),
            0
          );
          setTotalSalary(total);
          console.log("Total Salary:", total);
        }
      } catch (error) {
        console.error("Error fetching payroll employees:", error);
      }
    };

    fetchPayrollEmployees();
  }, [id]);

  console.log("PayrollID in boxReport:", id);

  useEffect(() => {
    const fetchPayrollContent = async () => {
      try {
        const response = await api_url.post(`payroll-content/${id}`);
        if (response.status === 200) {
          setPayrollContent(response.data);
          console.log("Payroll content in boxReport:", response.data);
        }
      } catch (error) {
        console.error("Error fetching payroll content:", error);
      }
    };

    fetchPayrollContent();
  }, [id]);

  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        const response = await api_url.post("/job-positions", {
          payroll_list_id: id,
        });

        if (response.status === 200) {
          setJobPositions(response.data);
          console.log("Job positions in boxReport:", response.data);
        }
      } catch (error) {
        console.error("Error fetching job positions:", error);
      }
    };

    fetchJobPositions();
  }, [id]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="flex mt-4 justify-center gap-3">
        <div className="grid gap-4 sm:grid-cols-2 pb-4">
          <div
            className="flex justify-center p-4 flex-col bg-white dark:bg-gray-700 rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base dark:text-white ">
              Payroll Name:
            </h1>
            <h1 className="font-bold text-xl py-2 dark:text-white whitespace-normal">
              {payrollName} -{" "}
              <span className="text-sm">
                {payrollContent.length > 0
                  ? payrollContent[0].description
                  : "Loading..."}
              </span>
            </h1>
          </div>
          <div
            className="p-4 bg-white dark:bg-gray-700 rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base dark:text-white">
              Total Salaries
            </h1>
            <h1 className="font-bold text-3xl py-2 dark:text-white">
              ₱
              {totalSalary.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h1>
            <h1 className="font-light text-sm dark:text-white">Pesos</h1>
          </div>
          <div
            className="p-4 bg-white dark:bg-gray-700 rounded-md border text-left"
            style={{ width: "249px", height: "139px" }}
          >
            <h1 className="font-bold text-base dark:text-white ">
              Total Employees
            </h1>
            <h1 className="font-bold text-3xl py-2 dark:text-white">
              {payrollEmployees.length}
            </h1>
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
            <div className="space-y-2">
              {jobPositions.map((positionData, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium dark:text-white">
                    {index + 1}. {positionData.title} {/* Correct field */}
                  </span>
                  <span className="text-gray-600 text-sm dark:text-white">
                    ₱ {positionData.salary}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
