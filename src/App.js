import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchDailyData, fetchData } from "./api";

class App extends React.Component {
  state = {
    data: [],
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchDailyData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchDailyData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Cards {...data[data.length - 1]} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart dailyData={data} />
      </div>
    );
  }
}

export default App;
