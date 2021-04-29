import React from "react";
import styles from "./Navbar.module.css";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.navbar}>
        <Typography variant="h6" className={styles.title}>
          Covid-19 Tracker
        </Typography>
        <Link
          href="https://github.com/vgarmes/covid-tracker"
          target="_blank"
          rel="noopener"
          variant="body1"
          color="inherit"
        >
          About
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
