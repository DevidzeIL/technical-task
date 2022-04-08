import React, { useState } from "react";
import "./App.css"


const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const API_HOST = "https://dw7oi55gga.execute-api.us-east-1.amazonaws.com/";
const API_URL = "v1/getcurrentweather/";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const inputChangeHandler = (event) => setCity(event.target.value);

  const btnClickHandler = () =>
    fetch(API_HOST + API_URL + `?city=${city}`, {
      headers: { 'Authorization': ACCESS_TOKEN }
  })
      .then((response) => response.json())
      .then((data) =>
        setWeather(`Temperature: ${data.temperature} C°
Weather condition: ${data.weatherCondition.type}\n
Wind: ${data.wind.speed} km/h
Wind direction: ${data.wind.direction}
Pressure: ${data.weatherCondition.pressure}
Humidity: ${data.weatherCondition.humidity}`)
      );

  return (
    <div className="App">
      <div className="block__search">
        <input className="input__search" type="text" value={city} onChange={inputChangeHandler} />
        <button className="btn__search" onClick={btnClickHandler}>Search</button>
      </div>

      <label> Results for City Name: {city}</label>
      <br />

      <div style={{ whiteSpace: "pre", border: "1px solid black"}}>{weather}</div>
    </div>
  );
}

export default App;
