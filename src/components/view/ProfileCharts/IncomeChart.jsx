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

// Overall Income Summary Chart - Horizontal Bar Chart
export const OverallIncomeChart = ({ data, title }) => {
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: false, // use square instead of circle
          pointStyle: "rect", // specifically set to rectangle
          font: {
            size: 12,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        callbacks: {
          label: (context) => {
            return `${
              context.dataset.label
            }: $${context.parsed.x.toLocaleString()}`;
          },
        },
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Aboriginal",
        data: data.aboriginal,
        backgroundColor: "#90EE90",
        borderColor: "#90EE90",
        borderWidth: 1,
      },
      {
        label: "Métis",
        data: data.metis,
        backgroundColor: "#4285F4",
        borderColor: "#4285F4",
        borderWidth: 1,
      },
      {
        label: "Non-Aboriginal",
        data: data.nonAboriginal,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Chart type="bar" options={options} data={chartData} />
    </div>
  );
};

// Métis Income Stats by Age Group - Combined Bar and Line Chart
export const MetisIncomeByAgeChart = ({ data, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        position: "left",
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        max: 50,
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
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: false, // use square instead of circle
          pointStyle: "rect", // set to rectangle
          font: {
            size: 11,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Prevalence of low income (%)") {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            }
            return `${
              context.dataset.label
            }: ${context.parsed.y.toLocaleString()}`;
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
        label: "Total Population",
        data: data.totalPopulation,
        backgroundColor: "#4285F4",
        borderColor: "#4285F4",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Low Income Population",
        data: data.lowIncomePopulation,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Population not in Low Income",
        data: data.notLowIncomePopulation,
        backgroundColor: "#90EE90",
        borderColor: "#90EE90",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Prevalence of low income (%)",
        data: data.prevalenceRate,
        borderColor: "#FF0000",
        backgroundColor: "#FF0000",
        yAxisID: "y1",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Chart type="line" options={options} data={chartData} />
    </div>
  );
};
