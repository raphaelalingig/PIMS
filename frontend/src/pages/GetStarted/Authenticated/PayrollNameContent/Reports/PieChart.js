import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ payrollEmployees }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Calculate payment status totals
    const paymentStatusTotals = {
      paid: 0,
      pending: 0,
      onHold: 0,
    };

    // Count employees in each payment status
    payrollEmployees.forEach((employee) => {
      switch (employee.payment_status) {
        case 1:
          paymentStatusTotals.paid++;
          break;
        case 2:
          paymentStatusTotals.pending++;
          break;
        case 3:
          paymentStatusTotals.onHold++;
          break;
      }
    });

    // Get the canvas element
    const ctx = chartRef.current.getContext("2d");

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Paid", "Pending", "On Hold"],
        datasets: [
          {
            data: [
              paymentStatusTotals.paid,
              paymentStatusTotals.pending,
              paymentStatusTotals.onHold,
            ],
            backgroundColor: [
              "#4CAF50", // Green for Paid
              "#2196F3", // Blue for Pending
              "#F44336", // Red for On Hold
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Payment Status Distribution",
            font: {
              size: 16,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const value = context.parsed;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [payrollEmployees]); // Recreate chart when data changes

  return (
    <div className="bg-white dark:bg-gray-700 border dark:border-white p-4 rounded-lg shadow h-72">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
