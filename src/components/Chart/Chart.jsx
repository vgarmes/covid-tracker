import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ dailyData, country }) => {
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

  const barChart = dailyData.length ? (
    <Bar
      data={{
        labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
        datasets: [
          {
            label: "Infected",
            data: dailyData.map(({ NewConfirmed }) => NewConfirmed),
            backgroundColor: "rgb(255, 0, 0)",
          },
        ],
      }}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: { display: true, text: `Current state in` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
