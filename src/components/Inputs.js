import React, { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  // Handler for search button click
  const handleSearchClick = () => {
    if (city.trim() !== "") {
      setQuery({ q: city.trim() });
      // Clear the city input after search
      setCity("");
    }
  };

  // Handler for unit change button click
  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  };

  // Handler for key press events in the input field
  const handleKeyPress = (e) => {
    // Check if the Enter key is pressed
    if (e.key === "Enter") {
      // Call handleSearchClick to perform the search
      handleSearchClick();
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      {/* City search input and search button */}
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyPress={handleKeyPress}
          type="text"
          className="text-xl font-light px-4 py-2 w-full shadow-xl focus:outline-none capitalize rounded-lg
    sm:px-2 sm:py-1" 
          placeholder="Search for city...."
        />

        <UilSearch
          size={25}
          className="text-white cursor-pointer ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
      </div>
      {/* Unit selection buttons */}
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition-ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition-ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
