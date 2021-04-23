import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
const url = "https://api.covid19api.com/world/total";

const url_timerange =
  "https://api.covid19api.com/world?from=2021-04-01T00:00:00Z&to=2021-04-20T00:00:00Z";

class App extends React.Component {
  state = {
    data: {},
  };
  async componentDidMount() {
    const fetchedData = await fetchData(url);
    this.setState({ data: fetchedData });
  }
  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Cards {...data} />
        <CountryPicker />
        <Chart />
      </div>
    );
  }
}

export default App;
