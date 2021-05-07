import React from "react";
import SingleCard from "./SingleCard";
import { Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import cx from "classnames";

const tooltipTitles = {
  confirmed:
    "This number shows the cumulative number of confirmed human cases reported to date. The actual number of infections and cases is likely to be higher than reported. Reporting criteria and testing capacity vary between locations.",
  recovered:
    "May not correspond to actual current figures and not all recoveries may be reported. Reporting criteria vary between locations and some countries do not report recoveries.",
  deaths: "Reporting criteria vary between locations.",
};

const Cards = ({ dailyData }) => {
  const {
    TotalConfirmed,
    TotalDeaths,
    TotalRecovered,
    NewConfirmed,
    NewDeaths,
    NewRecovered,
  } = dailyData[dailyData.length - 1];

  const averageValues = {
    confirmed: Math.floor(
      (TotalConfirmed - dailyData[0].TotalConfirmed) / dailyData.length
    ),
    recovered: Math.floor(
      (TotalRecovered - dailyData[0].TotalRecovered) / dailyData.length
    ),
    deaths: Math.floor(
      (TotalDeaths - dailyData[0].TotalDeaths) / dailyData.length
    ),
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <SingleCard
          title={"Cases"}
          description={"Number of cumulative confirmed cases to date*"}
          tooltipText={tooltipTitles.confirmed}
          totalValue={TotalConfirmed}
          newValue={NewConfirmed}
          averageValue={averageValues.confirmed}
          style={cx(styles.card, styles.infected)}
        />

        <SingleCard
          title={"Recovered"}
          description={"Number of cumulative recoveries to date*"}
          tooltipText={tooltipTitles.recovered}
          totalValue={TotalRecovered}
          newValue={NewRecovered}
          averageValue={averageValues.recovered}
          style={cx(styles.card, styles.recovered)}
          positiveTrend={true}
        />

        <SingleCard
          title={"Deaths"}
          description={"Number of cumulative deaths caused to date*"}
          tootlipText={tooltipTitles.deaths}
          totalValue={TotalDeaths}
          newValue={NewDeaths}
          averageValue={averageValues.deaths}
          style={cx(styles.card, styles.deaths)}
        />
      </Grid>
    </div>
  );
};

export default Cards;
