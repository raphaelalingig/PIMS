import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PaymentStatusChart = ({ paymentStatusTotals }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

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
        },
      },
    });

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [paymentStatusTotals]); // Recreate chart when data changes

  return (
    <div className="bg-white dark:bg-gray-700 border dark:border-white p-4 rounded-lg shadow h-72">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PaymentStatusChart;
