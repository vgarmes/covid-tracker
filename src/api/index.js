const url = "https://api.covid19api.com";

const getTimeParams = () => {
  const { date_ini, date_end } = getTimePeriod();
  return `from=${date_ini}&to=${date_end}`;
};

const getTimePeriod = () => {
  let date = new Date();
  const date_end = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toISOString();

  date = new Date(date.setDate(date.getDate() - 90));

  const date_ini = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toISOString();

  return { date_ini, date_end };
};

export const fetchDailyData = async (country) => {
  let changeableUrl = "";
  if (country) {
    changeableUrl = `${url}/country/${country}?${getTimeParams()}`;
  } else {
    changeableUrl = `${url}/world?${getTimeParams()}`;
  }

  try {
    const response = await fetch(changeableUrl);
    let data = await response.json();

    /*data has to be sorted by date*/
    data.sort(function (a, b) {
      return new Date(a.Date) - new Date(b.Date);
    });

    if (country) {
      data = cleanData(data);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const cleanData = (data) => {
  /*Data with a Province value is filtered out*/
  data = data.filter(({ Province }) => Province === "");
  /*Generate incremental values and clean up if they are negative*/
  data = data.map(({ Date, Confirmed, Deaths, Recovered }, index) => {
    if (index > 0) {
      return {
        Date: Date,
        TotalConfirmed: Confirmed,
        TotalDeaths: Deaths,
        TotalRecovered: Recovered,
        NewConfirmed:
          Confirmed >= data[index - 1]["Confirmed"]
            ? Confirmed - data[index - 1]["Confirmed"]
            : 0,
        NewDeaths:
          Deaths >= data[index - 1]["Deaths"]
            ? Deaths - data[index - 1]["Deaths"]
            : 0,
        NewRecovered:
          Recovered > data[index - 1]["Recovered"]
            ? Recovered - data[index - 1]["Recovered"]
            : 0,
      };
    } else {
      return "";
    }
  });
  data.shift();
  return data;
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${url}/summary`);
    const data = await response.json();
    /* countries are fetched from /summary instead of /countries because the latter introduces Provinces*/

    const countryList = data["Countries"].map(({ Country, Slug }) => {
      return {
        Country,
        Slug,
      };
    });
    return countryList;
  } catch (error) {
    console.log(error);
  }
};
