import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  Fade,
} from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const tooltipTitles = {
  confirmed:
    "This number shows the cumulative number of confirmed human cases reported to date. The actual number of infections and cases is likely to be higher than reported. Reporting criteria and testing capacity vary between locations.",
  recovered:
    "May not correspond to actual current figures and not all recoveries may be reported. Reporting criteria vary between locations and some countries do not report recoveries.",
  deaths: "Reporting criteria vary between locations.",
};

const Cards = ({ dailyData }) => {
  const [showIncrement, setShowIncrement] = useState(false);

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
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Cases
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={TotalConfirmed}
                duration={2.5}
                separator=","
                onEnd={() => setShowIncrement(true)}
              />
            </Typography>
            <Fade in={showIncrement}>
              <Typography
                variant="h6"
                className={
                  NewConfirmed > averageValues.confirmed
                    ? styles.redText
                    : styles.greenText
                }
              >
                {`(+${NewConfirmed.toLocaleString()}) `}
                {NewConfirmed > averageValues.confirmed ? (
                  <FaArrowUp className={styles.iconStatus} />
                ) : (
                  <FaArrowDown className={styles.iconStatus} />
                )}
              </Typography>
            </Fade>

            <Tooltip title={tooltipTitles.confirmed}>
              <Typography variant="body2">
                Number of cumulative confirmed cases to date*
              </Typography>
            </Tooltip>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={TotalRecovered}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Fade in={showIncrement}>
              <Typography variant="h6">
                {`(+${NewRecovered.toLocaleString()}) `}
              </Typography>
            </Fade>
            <Tooltip title={tooltipTitles.recovered}>
              <Typography variant="body2">
                Number of cumulative recoveries to date*
              </Typography>
            </Tooltip>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={TotalDeaths}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Fade in={showIncrement}>
              <Typography
                variant="h6"
                className={
                  NewDeaths > averageValues.deaths
                    ? styles.redText
                    : styles.greenText
                }
              >
                {`(+${NewDeaths.toLocaleString()}) `}
                {NewDeaths > averageValues.deaths ? (
                  <FaArrowUp className={styles.iconStatus} />
                ) : (
                  <FaArrowDown className={styles.iconStatus} />
                )}
              </Typography>
            </Fade>
            <Tooltip title={tooltipTitles.deaths}>
              <Typography variant="body2">
                Number of cumulative deaths caused to date*
              </Typography>
            </Tooltip>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
