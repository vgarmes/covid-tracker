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

  date = new Date(date.setDate(date.getDate() - 30));

  const date_ini = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toISOString();

  return { date_ini, date_end };
};

export const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {}
};

export const fetchDailyData = async (country) => {
  let changeableUrl = "";
  if (country && country !== "global") {
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

    /*Data with a Province value is filtered out*/
    if (country && country !== "global") {
      data = data
        .filter(({ Province }) => Province === "")
        .map(({ Date, Confirmed, Deaths, Recovered, Province }) => {
          return {
            Date: Date,
            TotalConfirmed: Confirmed,
            TotalDeaths: Deaths,
            TotalRecovered: Recovered,
          };
        });
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(`${url}/countries`);
    const data = await response.json();
    /*const countryList = data.map(({ Country }) => Country).sort();*/
    const countryList = data.sort((a, b) =>
      a.Country > b.Country ? 1 : b.Country > a.Country ? -1 : 0
    );
    return countryList;
  } catch (error) {
    console.log(error);
  }
};
