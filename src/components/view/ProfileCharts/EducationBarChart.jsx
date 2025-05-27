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

const EducationBarChart = ({
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
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
          },
          padding: 20,
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

  // Ensure datasets have the correct colors matching your screenshot
  const processedDatasets = datasets.map((dataset, index) => {
    let backgroundColor;
    switch (dataset.label) {
      case "Aboriginal":
        backgroundColor = "#90EE90"; // Light green
        break;
      case "Métis":
        backgroundColor = "#4285F4"; // Blue
        break;
      case "Non-Aboriginal":
        backgroundColor = "#FF6384"; // Red/Pink
        break;
      default:
        backgroundColor = dataset.backgroundColor;
    }

    return {
      ...dataset,
      backgroundColor,
      borderColor: backgroundColor,
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

export default EducationBarChart;
