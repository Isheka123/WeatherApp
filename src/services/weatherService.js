import { DateTime } from "luxon";

// Get API key from environment variables
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch weather data based on the info type (e.g., 'weather' or 'forecast') and search parameters
const getWeatherData = (infoType, searchParams) => {
  // Destructure units from searchParams and use the rest of the parameters as otherParams
  const { units, ...otherParams } = searchParams;
  
  // Construct the URL for the API request
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({
    ...otherParams,
    appid: API_KEY,
    units: units || "metric",
  });

  // Fetch data from the API and parse the response as JSON
  return fetch(url).then((res) => res.json());
};

// Function to format current weather data
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    weather,
    name,
    dt,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed, deg },
  } = data;
  const { main: details, icon, description, main } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    speed,
    icon,
    details,
    deg,
    description,
    main,
  };
};

// Function to format daily forecast data
const formatDailyForecast = (data) => {
  const today = new Date().toISOString().split("T")[0];

  const dailyData = {};

  // Group hourly data into daily data based on the date
  data.list.forEach((hourlyData) => {
    const date = hourlyData.dt_txt.split(" ")[0];

    if (date !== today) {
      if (!dailyData[date]) {
        dailyData[date] = {
          dt: hourlyData.dt,
          temps: [],
          weather: [],
          icons: [],
        };
      }

      dailyData[date].temps.push(hourlyData.main.temp);
      dailyData[date].weather.push(hourlyData.weather[0].main);
      dailyData[date].icons.push(hourlyData.weather[0].icon);
    }
  });

  // Format the daily forecast data
  const formattedDailyForecast = Object.values(dailyData).map((dayData) => {
    const formattedDate = formatToLocalTime(dayData.dt, "UTC", "d LLL");
    const avgTemp =
      dayData.temps.reduce((acc, temp) => acc + temp, 0) / dayData.temps.length;

    return {
      date: formattedDate,
      avgTemp: avgTemp,
      weather: dayData.weather[0],
      icon: dayData.icons[0],
    };
  });

  return formattedDailyForecast;
};

// Function to get formatted weather data including current weather and daily forecast
const getFormatedWeatherData = async (searchParams) => {
  // Fetch and format current weather data
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  // Use lat and lon from the current weather data to get daily forecast
  const { lat, lon } = formattedCurrentWeather;
  const formattedDailyForecast = await getWeatherData("forecast", {
    lat,
    lon,
    appid: API_KEY,
    units: searchParams.units,
  }).then(formatDailyForecast);

  // Combine current weather and daily forecast data
  return { ...formattedCurrentWeather, daily: formattedDailyForecast };
};

// Function to format UNIX timestamp to local time based on timezone
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Function to generate icon URL based on weather code
const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormatedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
