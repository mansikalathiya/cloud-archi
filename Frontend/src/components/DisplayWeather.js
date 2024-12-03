import React from "react";
import UserPool from "../utils/UserPool";
import { useNavigate } from "react-router-dom";

function DisplayWeather({ data }) {
  // Convert Kelvin to Celsius
  const celcius = (data.main.temp - 273.15).toFixed(2);
  const navigate = useNavigate();

  const handleLogout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div className="card mt-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{data.name}, {data.sys.country}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Temperature: {celcius}°C</li>
          <li className="list-group-item">Weather: {data.weather[0].description}</li>
          <li className="list-group-item">Humidity: {data.main.humidity}%</li>
          <li className="list-group-item">Wind Speed: {data.wind.speed} m/s</li>
        </ul>
      </div>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DisplayWeather;