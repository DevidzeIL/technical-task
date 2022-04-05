import React, { useState } from "react";
import "./App.css"

const API_KEY = process.env.REACT_APP_API_KEY

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const f = (deg) => {
  if (deg < 45 / 2 || deg <= 360)
    return "N (North)";
  else if (deg < 45 / 2 + 45)
    return "NE (North East)";
  else if (deg < 45 / 2 + 45 * 2)
    return "E (East)";
  else if (deg < 45 / 2 + 45 * 3)
    return "SE (South East)";
  else if (deg < 45 / 2 + 45 * 4)
    return "S (South)";
  else if (deg < 45 / 2 + 45 * 5)
    return "SW (South West)";
  else if (deg < 45 / 2 + 45 * 6)
    return "W (West)";
  else if (deg < 45 / 2 + 45 * 7)
    return "NW (North West)";
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const inputChangeHandler = (event) => setCity(event.target.value);
  const btnClickHandler = () =>
    fetch(API_URL + `?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) =>
        setWeather(`Temperature: ${data.main.temp} C°
Weather condition: ${data.weather[0].main}\n
Wind: ${data.wind.speed} km/h
Wind direction: ${f(data.wind.deg)}
Pressure: ${data.main.pressure}
Humidity: ${data.main.humidity}`)
      );

  return (
    <div className="App">
      <div className="block__search">
        <input className="input__search" type="text" value={city} onChange={inputChangeHandler} />
        <button className="btn__search" onClick={btnClickHandler}>Search</button>
      </div>

      <label> Results for City Name: {city}</label>
      <br />

      <div style={{ whiteSpace: "pre" }}>{weather}</div>
    </div>
  );
}

export default App;
