import TopButtons from "./components/TopButtons";
import { useEffect, useState } from "react";
import Inputs from "./components/Inputs";
import Time from "./components/Time";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormatedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundLayout from "./components/Background";

function App() {
  const [query, setQuery] = useState({ q: "Bengaluru" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  // useEffect hook to fetch weather data when query or units change
  useEffect(() => {
    const fetchWeather = async () => {
      // Check if city query is present
      if (!query.q) {
        toast.error("Please enter a city.");
        return;
      }

      // Display a message indicating that weather data is being fetched
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);

      try {
        // Fetch and set weather data
        const data = await getFormatedWeatherData({ ...query, units });
        toast.success(
          `Successfully fetched weather for ${data.name},${data.country}.`
        );
        setWeather(data);
      } catch (error) {
        // Display an error message if there's an issue fetching weather data
        toast.error("Error fetching weather data. Please try again.");
        console.error("Error fetching weather data:", error);
      }
    };

    // Invoke the fetchWeather function when query or units change
    fetchWeather();
  }, [query, units]);
  

 
  return (
    <div
    className={`mx-auto max-w-screen-md px-8 md:px-32 pb-9 py-1 rounded-lg lg:shadow-xl shadow-gray-400 bg-gradient-to-br from-cyan-700 to-blue-700 `}
  >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <Time weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="Daily forecast" items={weather.daily} />
          <BackgroundLayout weather={weather} />
        </div>
      )}
      {/* Display a ToastContainer for notifications */}
      <ToastContainer autoClose={2500} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
