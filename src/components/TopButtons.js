import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const TopButtons = (props) => {
  // Array of cities to be displayed in the top menu
  const cities = [
    {
      id: 1,
      title: "Andhra Pradesh",
    },
    {
      id: 2,
      title: "Chennai",
    },
    {
      id: 3,
      title: "Bengaluru",
    },
    {
      id: 4,
      title: "Hyderabad",
    },
    {
      id: 5,
      title: "Delhi",
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu's visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between my-6">
      {/* Menu for Large Screens */}
      <div className="hidden md:flex items-center justify-around my-5 gap-6">
        {cities.map((city) => (
          <button
            key={city.id}
            className="text-white text-lg font-medium p-0 m-0"
            onClick={() => props.setQuery({ q: city.title })}
          >
            {city.title}
          </button>
        ))}
      </div>

      {/* Menu Button for Medium and Small Screens */}
      <div className="lg:hidden">
        <div className="flex justify-center items-center gap-24">
          {/* Button to toggle the menu */}
          <button
            className="text-white text-lg font-medium"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="text-white text-lg font-medium">Weather App</h1>
        </div>

        {/* Render the menu if it's open */}
        {menuOpen && (
          <div className="absolute bg-white p-2 rounded shadow mt-2">
            {cities.map((city) => (
              <button
                key={city.id}
                className="text-gray-800 text-lg font-medium block p-2 w-full"
                onClick={() => {
                  toggleMenu();
                  props.setQuery({ q: city.title });
                }}
              >
                {city.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopButtons;
