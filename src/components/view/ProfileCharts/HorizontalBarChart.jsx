// This component is used for Housing section in profile page
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

const HorizontalBarChart = ({
  labels = [],
  datasets = [],
  maxPercentage = 60,
  title = "",
}) => {
  const options = {
    indexAxis: "y", // horizontal bar chart
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        stacked: false,
        max: maxPercentage,
        ticks: {
          callback: (value) => `${value}%`, // format x-axis labels as percentages
        },
      },
      y: {
        stacked: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
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
          title: (tooltipItems) => {
            return labels[tooltipItems[0].dataIndex];
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}%`;
          },
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

export default HorizontalBarChart;
