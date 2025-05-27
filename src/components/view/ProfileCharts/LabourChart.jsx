import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LabourChart = ({ identityGroup, data, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      title: {
        display: !!title,
        text: title,
        font: {
          size: 20, // header size
          weight: "bold",
        },
        color:
          identityGroup === "Aboriginal"
            ? "#006400"
            : identityGroup === "Métis"
            ? "#4285F4"
            : "#FF6384",
        padding: {
          bottom: 20, // space between title and chart
        },
      },
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        type: "bar",
        label: "Employment rate",
        data: data.employmentRate,
        backgroundColor: "#90EE90",
        borderColor: "#90EE90",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Unemployment rate",
        data: data.unemploymentRate,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Participation rate",
        data: data.participationRate,
        borderColor: "#4285F4",
        backgroundColor: "#4285F4",
        yAxisID: "y1",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%", marginBottom: "30px" }}>
      <Chart type="bar" options={options} data={chartData} />
    </div>
  );
};

export default LabourChart;
