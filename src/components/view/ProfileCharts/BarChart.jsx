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
  labels = [],
  datasets = [],
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
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
