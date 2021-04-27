import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import ChartPicker from "../ChartPicker/ChartPicker";

const Chart = ({ dailyData }) => {
  const [showBarChart, setShowBarChart] = useState(false);
  const switchChart = () => {
    setShowBarChart(!showBarChart);
  };

  const lineChartData = [
    {
      labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
      datasets: [
        {
          data: dailyData.map(({ TotalConfirmed }) => TotalConfirmed),
          label: "Infected",
          borderColor: "#333ff",
          fill: true,
        },
      ],
    },
    {
      labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
      datasets: [
        {
          data: dailyData.map(({ TotalDeaths }) => TotalDeaths),
          label: "Deaths",
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          fill: true,
        },
      ],
    },
  ];

  const barChartData = [
    {
      labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
      datasets: [
        {
          label: "Infected",
          data: dailyData.map(({ NewConfirmed }) => NewConfirmed),
          backgroundColor: "rgb(51, 63, 15)",
        },
      ],
    },
    {
      labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
      datasets: [
        {
          label: "Deaths",
          data: dailyData.map(({ NewDeaths }) => NewDeaths),
          backgroundColor: "rgb(255, 0, 0)",
        },
      ],
    },
  ];

  const barChartOptions = [
    {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
      },
    },
    {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  ];

  const lineChart = dailyData.length ? (
    <>
      <Line data={lineChartData[0]} />
      <Line data={lineChartData[1]} />
    </>
  ) : null;

  const barChart = dailyData.length ? (
    <>
      <Bar data={barChartData[0]} options={barChartOptions[0]} />
      <Bar data={barChartData[1]} options={barChartOptions[1]} />
    </>
  ) : null;
  return (
    <>
      <ChartPicker showBarChart={showBarChart} switchChart={switchChart} />
      <div className={styles.container}>
        {showBarChart ? barChart : lineChart}
      </div>
    </>
  );
};

export default Chart;
