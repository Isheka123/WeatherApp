import React from "react";
import { formatToLocalTime } from "../services/weatherService";

const Time = ({ weather: { dt, timezone, name, country } }) => {
  return (
    <div>
      {/* Display the formatted local time */}
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      {/* Display the city name and country */}
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
          {`${name},${country}`}
        </p>
      </div>
    </div>
  );
};


export default Time;
