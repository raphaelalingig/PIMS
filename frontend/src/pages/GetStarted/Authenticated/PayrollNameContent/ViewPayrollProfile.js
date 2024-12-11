import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import userLogo from "../../../../assets/images/userLogo.gif";
import { useParams } from "react-router-dom";
import api_url from "../../../../components/api_url";

export default function ViewPayrollProfile() {
  const { token } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
    }).format(parseFloat(amount));
  };

  // Function to map salary type
  const mapSalaryType = (type) => {
    switch (type) {
      case 1:
        return "Daily";
      case 2:
        return "Every 15 Days";
      case 3:
        return "Monthly";
      default:
        return "Unknown";
    }
  };

  // Function to map payment status
  const mapPaymentStatus = (status) => {
    switch (status) {
      case 1:
        return "Paid";
      case 2:
        return "Pending";
      case 3:
        return "On Hold";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api_url.post(`/view-payroll-profile/${token}`);
        if (response.status === 200 && response.data.success) {
          setProfileData(response.data.Data);
          console.log("User Profile:", response.data.Data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Render error state if no data
  if (!profileData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Unable to load profile data
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6FA] dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-800 p-4 ">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg relative">
          {/* Dropdown Menu */}

          <div className="flex flex-col items-center p-8 dark:bg-gray-900 rounded-md">
            {/* Profile Image Section */}
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg dark:bg-gray-900"
                src={userLogo}
                alt="Employee profile"
              />
              <span className="absolute -bottom-2 right-0 px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">
                Employee
              </span>
            </div>

            {/* User Info Header */}
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              {profileData.employee_name}
            </h2>
            <span className="text-sm font-medium text-gray-500 dark:text-white">
              {profileData.job_position}
            </span>

            {/* Employee Details Grid */}
            <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-6 dark:bg-gray-900">
              <InfoItem label="Employee ID" value={profileData.employee_id} />
              <InfoItem label="Payroll Name" value={profileData.payroll_name} />
              <InfoItem
                label="Mobile Number"
                value={profileData.mobile_number}
              />
              <InfoItem
                label="Basic Pay"
                value={formatCurrency(profileData.basic_pay)}
              />
              <InfoItem
                label="Salary Type"
                value={mapSalaryType(profileData.salary_type)}
              />
              <InfoItem
                label="Payment Status"
                value={mapPaymentStatus(profileData.payment_status)}
                status={
                  profileData.payment_status === 1 ? "success" : "warning"
                }
              />
              <InfoItem
                label="Overtime Hours"
                value={profileData.overtime_hours}
              />
              <InfoItem
                label="Night Differential Hours"
                value={profileData.nightDifferential_hours}
              />
              <InfoItem
                label="Deduction Reason"
                value={profileData.deduction_reason}
              />
              <InfoItem
                label="Deductions Amount"
                value={formatCurrency(profileData.deductions_amount)}
              />
              <InfoItem
                label="Total Pay"
                value={formatCurrency(profileData.total_pay)}
                highlight
              />
              <InfoItem
                label="Salary Date"
                value={new Date(profileData.salary_date).toLocaleDateString()}
              />
              <InfoItem
                label="Created Date"
                value={new Date(profileData.created_date).toLocaleDateString()}
              />
            </div>

            {/* Action Button */}
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value, status, highlight }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-500 dark:text-white">
      {label}
    </span>
    <span
      className={`
      text-sm font-semibold
      ${highlight ? "text-blue-600 text-lg" : "text-gray-900 dark:text-white"}
      ${status === "success" ? "text-green-600" : ""}
      ${status === "warning" ? "text-yellow-600" : ""}
    `}
    >
      {value}
    </span>
  </div>
);
