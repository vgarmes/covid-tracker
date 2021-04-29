# COVID-19 Tracker App

This app tracks the number of cases of COVID-19 both globally and by country. The app is done in React JS using some external libraries like Charts.JS and Material-UI in order to display the data.

The data is fetched using the free API at [https://covid19api.com/](https://covid19api.com/).

Once data is retrieved, the following indicators are displayed on cards containing:

- Total confirmed cases/recoveries/deaths to date
- Number of cases/recoveries/deaths during the previous day.
- Trend of the number of cases and deaths.

Data is also displayed on charts containing:

- Line chart with total confirmed cases and deaths during the last 3 months.
- Bar chart with the number of daily cases and deaths during the last 3 months.

A switch button allows the user to switch between the different charts.

A dropdown selector allows the user to select the country to see the data from.

## Installation

In the project directory, run:

### `npm install && npm start`

## References

Project based on [Corona Tracker by
Adrian Hajdin](https://github.com/adrianhajdin/project_corona_tracker)

COVID-19 data source: [Josh Hopkins University CSSE](https://github.com/CSSEGISandData/COVID-19)
