import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
} from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const tooltipTitles = {
  confirmed:
    "This number shows the cumulative number of confirmed human cases reported to date. The actual number of infections and cases is likely to be higher than reported. Reporting criteria and testing capacity vary between locations.",
  recovered:
    "May not correspond to actual current figures and not all recoveries may be reported. Reporting criteria vary between locations and some countries do not report recoveries.",
  deaths: "Reporting criteria vary between locations.",
};

const Cards = ({ Date, TotalConfirmed, TotalDeaths, TotalRecovered }) => {
  if (!TotalConfirmed) {
    return "Loading...";
  }

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
              />
            </Typography>
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
