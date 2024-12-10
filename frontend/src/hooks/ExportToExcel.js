import * as XLSX from 'xlsx';

const exportToExcel = (payrollEmployees) => {
  // Prepare the data for Excel export
  const exportData = payrollEmployees.map((employee) => ({
    'Employee ID': employee.employee_id,
    'Employee Name': employee.employee_name,
    'Position/Job Title': employee.job_position,
    'Mobile Number': employee.mobile_number,
    'Basic Pay': `₱ ${employee.basic_pay}`,
    'Salary Date': formatDateForExport(employee.salary_date),
    'Payment Status': getPaymentStatusText(employee.payment_status),
    'Additional Earnings/Deductions': generateAdditionalPaymentsText(employee),
    'Total Salary': `₱ ${employee.total_pay}`
  }));

  // Create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Payroll Employees');

  // Generate the Excel file
  XLSX.writeFile(workbook, `Payroll_Employees_${new Date().toISOString().split('T')[0]}.xlsx`);
};

// Helper function to format payment status
const getPaymentStatusText = (status) => {
  switch (status) {
    case 1: return 'Paid';
    case 2: return 'Pending';
    case 3: return 'On Hold';
    default: return '';
  }
};

// Helper function to format additional payments
const generateAdditionalPaymentsText = (employee) => {
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
    .join(', ');

  return additionalPayments || 'None';
};

// Helper function to format date for export
const formatDateForExport = (dateString) => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid Date";
  }
};

export default exportToExcel;