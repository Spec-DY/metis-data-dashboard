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

function HorizontalStackedBarChart({
  labels = [],
  datasets = [],
  title = "Distribution",
  maxPercentage = 100,
}) {
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
        max: maxPercentage,
        ticks: {
          callback: (value) => `${value}%`, // format x-axis labels as percentages
        },
      },
      y: {
        stacked: true,
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
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return <Bar options={options} data={data} />;
}

export default HorizontalStackedBarChart;
