import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import ChartPicker from "../ChartPicker/ChartPicker";

const Chart = ({ dailyData }) => {
  const [showBarChart, setShowBarChart] = useState(false);
  const changeChart = () => {
    setShowBarChart(!showBarChart);
  };
  const lineChart = dailyData.length ? (
    <>
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
          ],
        }}
      />
      <Line
        data={{
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
        }}
      />
    </>
  ) : null;

  const barChart = dailyData.length ? (
    <>
      <Bar
        data={{
          labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
          datasets: [
            {
              label: "Infected",
              data: dailyData.map(({ NewConfirmed }) => NewConfirmed),
              backgroundColor: "rgb(51, 63, 15)",
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
        }}
      />
      <Bar
        data={{
          labels: dailyData.map(({ Date }) => Date.slice(0, 10)),
          datasets: [
            {
              label: "Deaths",
              data: dailyData.map(({ NewDeaths }) => NewDeaths),
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
        }}
      />
    </>
  ) : null;
  return (
    <>
      <ChartPicker showBarChart={showBarChart} changeChart={changeChart} />
      <div className={styles.container}>
        {showBarChart ? barChart : lineChart}
      </div>
    </>
  );
};

export default Chart;
