import { useState, useEffect } from "react";

const useEmployeeSearch = (employees) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  // Update filtered employees whenever the search term or employees list changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredEmployees(employees);
      return;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase().trim();

    const filtered = employees.filter(
      (employee) =>
        // Search by employee ID (converted to string)
        employee.employee_id.toString().includes(lowercasedSearchTerm) ||
        // Search by employee name (case-insensitive)
        employee.employee_name.toLowerCase().includes(lowercasedSearchTerm)
    );

    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return {
    searchTerm,
    filteredEmployees,
    handleSearchChange,
  };
};

export default useEmployeeSearch;
