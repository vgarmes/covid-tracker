import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import { Alert } from "@material-ui/lab";
import styles from "./App.module.css";
import { fetchDailyData } from "./api";

class App extends React.Component {
  state = {
    data: [],
    country: "",
    msg: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchDailyData();
    if (fetchedData.length > 0) {
      this.setState({ data: fetchedData, msg: "" });
    } else {
      this.setState({
        msg: "Data not available!",
      });
    }
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchDailyData(country);
    if (fetchedData.length > 0) {
      this.setState({ data: fetchedData, country: country, msg: "" });
    } else {
      this.setState({ msg: "Data not available!" });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        {this.state.msg && <Alert severity="error">{this.state.msg}</Alert>}
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Cards {...data[data.length - 1]} />
        <Chart dailyData={data} />
      </div>
    );
  }
}

export default App;
