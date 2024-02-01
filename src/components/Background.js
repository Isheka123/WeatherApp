import React, { useEffect, useState } from "react";

import Clear from "../assets/Clear.jpg";
import Fog from "../assets/mist.jpg";
import Cloudy from "../assets/Cloudy.jpg";
import Rainy from "../assets/Rain.jpg";
import Snow from "../assets/snow.jpg";
import Stormy from "../assets/Stormy.jpg";

const BackgroundLayout = ({ weather }) => {
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    if (weather.weather && weather.weather.length > 0) {
      let imageString = weather.weather[0].main;

      // Updating the background image based on the weather condition
      if (imageString.includes("Clear")) {
        setImage(Clear);
      } else if (imageString.includes("Clouds")) {
        setImage(Cloudy);
      } else if (
        imageString.includes("Rain") ||
        imageString.includes("Drizzle")
      ) {
        setImage(Rainy);
      } else if (imageString.includes("Snow")) {
        setImage(Snow);
      } else if (
        [
          "Mist",
          "Smoke",
          "Haze",
          "Dust",
          "Sand",
          "Fog",
          "Ash",
          "Squall",
          "Tornado",
        ].some((condition) => imageString.includes(condition))
      ) {
        setImage(Fog);
      } else if (imageString.includes("Thunderstorm")) {
        setImage(Stormy);
      }
    }
  }, [weather]); // Dependency on the weather data

  // Render the background image
  return (
    <img
      src={image}
      alt="weather_image"
      className="h-screen w-full fixed left-0 top-0 -z-[10]"
    />
  );
};

export default BackgroundLayout;
