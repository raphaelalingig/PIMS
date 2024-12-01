import React from "react";
import Navbar from "../../../components/Navbar";
import PayrollTable from "./PayrollList/PayrollTable/PayrollTable";

export default function AuthenticatedDashboard() {
  return (
    <div className="bg-[#F4F6FA] dark:bg-gray-900 min-h-screen ">
      <Navbar />

      <main className="px-28 py-6">
        <PayrollTable />
      </main>
    </div>
  );
}
