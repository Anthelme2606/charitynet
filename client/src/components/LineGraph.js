import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineGraph = () => {
  const sampleData = [
    43, 40, 50, 40, 70, 40, 45, 33, 40, 60, 40, 50, 36, 40, 70, 40, 45, 60, 40,
    50, 36, 40, 70, 40, 45, 60, 40, 50
  ];

  const canvasData = {
    datasets: [
      {
        label: "Home",
        borderColor: "#541670",
        pointRadius: 0,
        fill: true,
        backgroundColor: "#f8a708",
        lineTension: 0.4,
        data: sampleData,
        borderWidth: 2
      }
    ]
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false
        },
        labels: [
          "Jav",
          "Fev",
          "Mar",
          "Avr",
          "Mai",
          "Jun",
          "Jul",
          "Aou",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        ticks: {
          color: "#541670",
          font: {
            family: "Nunito",
            size: 12
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5,
          color: "#541670",
          font: {
            family: "Nunito",
            size: 12
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: false
      }
    }
  };

  const graphStyle = {
    minHeight: "20rem",
    maxWidth: "100%",
    width: "100%",
    border: "1px solid #C4C4C4",
    borderRadius: "0.375rem",
    padding: "0.5rem"
  };

  return (
    <div style={graphStyle}>
      <Line id="home" options={options} data={canvasData} />
    </div>
  );
};

export default LineGraph;
