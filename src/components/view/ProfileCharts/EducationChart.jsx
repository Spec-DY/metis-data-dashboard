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

const EducationChart = ({
  labels = [],
  originalLabels = [],
  datasets = [],
  maxPercentage = 35,
  title = "",
}) => {
  const options = {
    indexAxis: "y", // horizontal bar chart
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    scales: {
      x: {
        stacked: false,
        max: maxPercentage,
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          maxRotation: 0,
          font: {
            size: 12, // Slightly larger font since labels are now shorter
          },
          maxTicksLimit: 20,
        },
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 30,
        },
      },
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: false, // use square instead of circle
          pointStyle: "rect", // explicitly set to rectangle
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        titleFont: {
          weight: "bold",
          size: 12,
        },
        bodyFont: {
          size: 11,
        },
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          title: (tooltipItems) => {
            // Show full original label in tooltip
            const index = tooltipItems[0].dataIndex;
            return originalLabels[index] || labels[index] || "";
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.x}%`;
          },
        },
      },
    },
    // Increase chart area to accommodate labels
    aspectRatio: 1.5,
  };

  // make sure labels are unique and not empty
  const processedDatasets = datasets.map((dataset) => {
    let backgroundColor;
    let borderColor;

    // set background and border colors based on dataset label
    switch (dataset.label) {
      case "Aboriginal":
        backgroundColor = "#90EE90"; // light green
        borderColor = "#90EE90";
        break;
      case "Métis":
        backgroundColor = "#4285F4"; // blue
        borderColor = "#4285F4";
        break;
      case "Non-Aboriginal":
        backgroundColor = "#FF6384"; // red
        borderColor = "#FF6384";
        break;
      default:
        backgroundColor = dataset.backgroundColor || "#90EE90";
        borderColor = dataset.borderColor || backgroundColor;
    }

    return {
      ...dataset,
      backgroundColor,
      borderColor,
      borderWidth: 0,
    };
  });

  const data = {
    labels,
    datasets: processedDatasets,
  };

  return (
    <div style={{ height: "600px", width: "100%", position: "relative" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default EducationChart;
