import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "0666c1cdad4a4e7f8e942549252301"; // Replace with your WeatherAPI key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

    if (!query.trim()) {
      setError("Please enter a valid location!");
      return;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("City not found!");
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Weather Finder</h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city (e.g., Chennai)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchWeather} className="search-button">
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-container">
          <h2>
            {weatherData.location.name}, {weatherData.location.region}
          </h2>
          <p className="temperature">{weatherData.current.temp_c}°C</p>
          <div className="weather-details">
            {/* <p>
              <strong>Humidity:</strong> {weatherData.current.humidity}%
            </p> */}
            <p>
              <strong>Wind:</strong> {weatherData.current.wind_kph} km/h
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
