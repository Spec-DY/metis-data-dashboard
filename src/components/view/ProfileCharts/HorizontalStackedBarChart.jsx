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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HorizontalStackedBarChart() {
  const options = {
    indexAxis: "y", // horizontal bar chart
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        stacked: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`, // format x-axis labels as percentages
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
  };

  const data = {
    labels: [
      "0 to 14 years",
      "15 to 24 years",
      "25 to 64 years",
      "65 years and over",
    ],
    datasets: [
      {
        label: "Aboriginal",
        data: [19.8, 16.3, 10.7, 4.8],
        backgroundColor: "#90EE90",
      },
      {
        label: "Metis",
        data: [9.2, 8.8, 6.5, 3.3],
        backgroundColor: "#6495ED",
      },
      {
        label: "Non-Aboriginal",
        data: [80.2, 83.7, 89.3, 95.2],
        backgroundColor: "#FF6384",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default HorizontalStackedBarChart;
