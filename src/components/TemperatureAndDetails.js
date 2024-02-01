import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSunset,
  UilSun,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

const TemperatureAndDetails = ({
  weather: {
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
    deg,
    description,
  },
}) => {
  return (
    <div>
      {/* Display the weather description */}
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p className="capitalize">{description}</p>
      </div>
      {/* Display the temperature and other details */}
      <div className="flex flex-row items-center justify-between text-white py-3">
        {/* Display weather icon */}
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        {/* Display current temperature */}
        <p className="text-5xl"> {`${temp.toFixed()}°`}</p>
        {/* Display additional weather details */}
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real fell:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()}km/h`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Direction:
            <span className="font-medium ml-1">{`${deg.toFixed()}°`}</span>
          </div>
        </div>
      </div>
      {/* Display sunrise, sunset, high, and low temperatures */}
      <div className="flex flex-col lg:flex-row items-center justify-center  space-x-2 text-white text-sm gap-2 py-3">
  <div className="flex items-center justify-center">
    <UilSun />
    <p className="font-light">
      Rise:
      <span className="font-medium ml-1">
        {formatToLocalTime(sunrise, timezone, "hh:mm a")}
      </span>
    </p>
  </div>
  <div className="flex items-center">
    {/* <p className="font-light">|</p> */}
    <UilSunset />
    <p className="font-light">
      Set:
      <span className="font-medium ml-1">
        {formatToLocalTime(sunset, timezone, "hh:mm a")}
      </span>
    </p>
  </div>
  <div className="flex items-center">
    {/* <p className="font-light">|</p> */}
    <UilArrowUp />
    <p className="font-light">
      Min Temp:
      <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
    </p>
  </div>
  <div className="flex items-center">
    {/* <p className="font-light">|</p> */}
    <UilArrowDown />
    <p className="font-light">
      Max Temp:
      <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
    </p>
  </div>
</div>
    </div>
  );
};

export default TemperatureAndDetails;
