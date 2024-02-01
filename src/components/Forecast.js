import React from "react";
import { iconUrlFromCode } from "../services/weatherService";


const Forecast = ({ title, items }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item, index) => (
          // Each forecast item is a flex container with vertical alignment
          <div key={index} className="flex flex-col items-center justify-center">
            {/* Date of the forecast item */}
            <p className="font-light text-sm">{item.date}</p>
            {/* Weather icon for the forecast item */}
            <img src={iconUrlFromCode(item.icon)} alt="" className="w-12 my-1" />
            {/* Weather description for the forecast item */}
            <p className="font-medium">{`${item.weather}`}</p>
            {/* Average temperature for the forecast item */}
            <p className="font-medium">{`${item.avgTemp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
