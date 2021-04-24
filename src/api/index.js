const url = "https://api.covid19api.com/world/total";

const getDailyUrl = () => {
  const { date_ini, date_end } = getTimePeriod();
  const url =
    "https://api.covid19api.com/world?from=" + date_ini + "&to=" + date_end;
  return url;
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

export const fetchDailyData = async () => {
  try {
    const response = await fetch(getDailyUrl());
    const data = await response.json();

    /*data has to be sorted by date*/
    data.sort(function (a, b) {
      return new Date(a.Date) - new Date(b.Date);
    });
    return data;
  } catch (error) {}
};
