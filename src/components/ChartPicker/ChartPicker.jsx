import React, { useState, useEffect } from "react";
import { Switch, Typography } from "@material-ui/core";
import styles from "./ChartPicker.module.css";

const ChartPicker = ({ showBarChart, changeChart }) => {
  return (
    <div className={styles.container}>
      <Typography variant="body2">Accumulated</Typography>
      <Switch
        checked={showBarChart}
        onChange={() => changeChart()}
        name="checked"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <Typography variant="body2">Incremental</Typography>
    </div>
  );
};

export default ChartPicker;
