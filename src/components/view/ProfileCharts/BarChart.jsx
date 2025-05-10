import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// global font color
ChartJS.defaults.color = "#000000";
ChartJS.defaults.font.family = "Arial, Helvetica, sans-serif";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  labels = ["Aboriginal identity", "Métis", "Non-Aboriginal identity"],
  datasets = [
    {
      label: "Suitable",
      data: [90.91, 89.05, 94.41],
      backgroundColor: "#90EE90",
    },
    {
      label: "Not Suitable",
      data: [8.88, 10.95, 5.59],
      backgroundColor: "#FF6384",
    },
  ],
  maxPercentage = 100,
  title = "",
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        max: maxPercentage,
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
    plugins: {
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          weight: "bold",
        },
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.raw.toFixed(2)}%`,
        },
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
