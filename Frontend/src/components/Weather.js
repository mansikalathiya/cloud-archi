import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayWeather from "./DisplayWeather";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPool from "../utils/UserPool";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      // Clear any stored user data
      localStorage.clear();
      // Redirect to login page
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!form.city.trim() || !form.country.trim()) {
      setError("Please enter both city and country");
      return;
    }
    
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${apiKey}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('City or country not found');
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        // Check if the error is related to city/country not found
        if (err.message.includes('not found')) {
          setError(`The city "${form.city}" was not found in "${form.country}". Please check your entries.`);
        } else {
          setError(err.message);
        }
        setWeather(null);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card weather-card border-0 shadow">
              <div className="card-header bg-warning text-dark text-center py-4">
                <h1 className="mb-0">Weather App</h1>
              </div>
              <div className="card-body bg-white">
                <form className="mb-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                    />
                  </div>
                  <button 
                    className="btn btn-warning w-100 btn-custom" 
                    type="submit"
                  >
                    Get Weather
                  </button>
                </form>

                {error && <div className="alert alert-danger">{error}</div>}
                
                {weather && <DisplayWeather data={weather} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;