import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Fade,
} from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SingleCard = ({
  title,
  description,
  tooltipText,
  totalValue,
  newValue,
  averageValue,
  style,
  positiveTrend = false,
}) => {
  const [showIncrement, setShowIncrement] = useState(false);

  const positiveColor = positiveTrend ? styles.greenText : styles.redText;
  const negativeColor = positiveTrend ? styles.redText : styles.greenText;

  return (
    <Grid item component={Card} xs={12} md={3} className={style}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5">
          <CountUp
            start={0}
            end={totalValue}
            duration={2.5}
            separator=","
            onEnd={() => setShowIncrement(true)}
          />
        </Typography>
        <Fade in={showIncrement}>
          <Typography
            variant="h6"
            className={newValue > averageValue ? positiveColor : negativeColor}
          >
            {`(+${newValue.toLocaleString()}) `}
            {newValue > averageValue ? (
              <FaArrowUp className={styles.iconStatus} />
            ) : (
              <FaArrowDown className={styles.iconStatus} />
            )}
          </Typography>
        </Fade>

        <Tooltip title={tooltipText}>
          <Typography variant="body2">{description}</Typography>
        </Tooltip>
      </CardContent>
    </Grid>
  );
};

export default SingleCard;
