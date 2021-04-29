import React from "react";
import { Typography, Box } from "@material-ui/core";
import styles from "./LastUpdate.module.css";

const LastUpdate = ({ Date: date }) => {
  const dt = new Date(date);

  return (
    <div className={styles.container}>
      <Typography variant="body2" color="textSecondary">
        <Box textAlign="center">{`Last updated at: ${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()} ${dt.toTimeString()}`}</Box>
      </Typography>
    </div>
  );
};

export default LastUpdate;
