import React from "react";

import { Navbar, Cards, LastUpdate, Chart, CountryPicker } from "./components";
import { Alert } from "@material-ui/lab";
import styles from "./App.module.css";
import { fetchDailyData } from "./api";

class App extends React.Component {
  state = {
    data: [],
    country: "",
    error: "",
    loading: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const fetchedData = await fetchDailyData();
    if (fetchedData.length > 0) {
      this.setState({ data: fetchedData, msg: "" });
    } else {
      this.setState({
        error: "Data not available!",
      });
    }
    this.setState({ loading: false });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchDailyData(country);
    if (fetchedData.length > 0) {
      this.setState({ data: fetchedData, country: country, msg: "" });
    } else {
      this.setState({ error: "Data not available!" });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return "Loading...";
    }

    if (error) {
      return <Alert severity="error">{this.state.msg}</Alert>;
    }

    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Cards dailyData={data} />
          <LastUpdate {...data[data.length - 1]} />
          <Chart dailyData={data} />
        </div>
      </>
    );
  }
}

export default App;
