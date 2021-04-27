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
          pointRadius: 0,
          pointHitRadius: 20,
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
          pointRadius: 0,
          pointHitRadius: 20,
        },
      ],
    },
  ];

  const lineChartOptions = {
    onResize: function (chart, size) {
      if (size.width < 450) {
        chart.options.scales.x.ticks.display = false;
        chart.options.scales.x.grid.display = false;
        chart.update();
      } else {
        chart.options.scales.x.ticks.display = true;
        chart.options.scales.x.grid.display = true;
        chart.update();
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            if (value >= 1e6) {
              return `${value / 1e6}M`;
            }
            return value;
          },
        },
      },
    },
  };

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

  const barChartOptions = {
    onResize: function (chart, size) {
      if (size.width < 450) {
        chart.options.scales.x.ticks.display = false;
        chart.options.scales.x.grid.display = false;
        chart.update();
      } else {
        chart.options.scales.x.ticks.display = true;
        chart.options.scales.x.grid.display = true;
        chart.update();
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            if (value >= 1e6) {
              return `${value / 1e6}M`;
            } else if (value >= 1e3) {
              return `${value / 1e3}K`;
            }
            return value;
          },
        },
      },
    },
  };

  const lineChart = dailyData.length ? (
    <>
      <Line data={lineChartData[0]} options={lineChartOptions} />
      <Line data={lineChartData[1]} options={lineChartOptions} />
    </>
  ) : null;

  const barChart = dailyData.length ? (
    <>
      <Bar data={barChartData[0]} options={barChartOptions} />
      <Bar data={barChartData[1]} options={barChartOptions} />
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
