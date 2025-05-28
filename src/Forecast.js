import React from "react";
import "./Forecast.css";

export default function Forecast({ data }) {
  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  return (
    <div className="forecast-container row text-center">
      {data.slice(1, 6).map((day, index) => (
        <div className="col" key={index}>
          <div className="forecast-day">{formatDay(day.time)}</div>
          <img
            src={day.condition.icon_url}
            alt={day.condition.description}
            className="forecast-icon"
          />
          <div className="forecast-temp">
            <strong>{Math.round(day.temperature.maximum)}°</strong> /{" "}
            {Math.round(day.temperature.minimum)}°
          </div>
        </div>
      ))}
    </div>
  );
}
