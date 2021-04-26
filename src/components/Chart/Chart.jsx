import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ dailyData }) => {
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
        datasets: [
          {
            data: dailyData.map(({ TotalConfirmed }) => TotalConfirmed),
            label: "Infected",
            borderColor: "#333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ TotalDeaths }) => TotalDeaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChar = dailyData.length ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [{}],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in` },
      }}
    />
  ) : null;
  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
