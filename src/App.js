import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Forecast from "./Forecast";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  function handleSearch(event) {
    event.preventDefault();
    const apiKey = "30927dtfa44b4770359oe8258a9c5b2c";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
    axios.get(forecastUrl).then(handleForecastResponse);
  }

  function handleResponse(response) {
    setWeather(response.data);
  }

  function handleForecastResponse(response) {
    setForecast(response.data.daily); // Check this with console.log(response.data.daily) if unsure
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="container weather-app mt-5">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Enter a city..."
            onChange={updateCity}
            required
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {weather && (
        <div className="weather-info text-center">
          <h1>{weather.city}</h1>
          <p>
            {new Date(weather.time * 1000).toLocaleString()}
            <br />
            {weather.condition.description}
          </p>
          <img
            src={weather.condition.icon_url}
            alt={weather.condition.description}
          />
          <h2>{Math.round(weather.temperature.current)}°C</h2>
          <p>
            Humidity: <strong>{weather.temperature.humidity}%</strong>
            <br />
            Wind: <strong>{weather.wind.speed} km/h</strong>
          </p>
        </div>
      )}

      {forecast && forecast.length > 0 && <Forecast data={forecast} />}

      <footer className="text-center mt-5">
        <small>
          This project was coded by{" "}
          <a
            href="https://github.com/Elmari121"
            target="_blank"
            rel="noreferrer"
          >
            Elmari Robberts
          </a>
          , open-sourced on{" "}
          <a
            href="https://github.com/Elmari121/weather-react-app"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{" "}
          and hosted on{" "}
          <a
            href="https://joyful-jelly-7b6571.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Netlify
          </a>
        </small>
      </footer>
    </div>
  );
}
