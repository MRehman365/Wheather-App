import React, { useState } from 'react';
import './App.css';
import image from './Sun-And-Cloud-PNG-HD.png';
import logo from './weather-icon.png';
// import background from './1760615.jpg';

function Weather() {
const [city, setCity] = useState('');
const [weatherData, setWeatherData] = useState('');
const [errorMessage, setErrorMessage] = useState('');

  const fetchWeather = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=995d2583852048f4b10165427240704&q=${city}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error.message);
          setWeatherData(null);
        } else {
          setErrorMessage('');
          setWeatherData(data);
        }
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setErrorMessage("Failed to fetch weather data. Please try again later.");
        setWeatherData(null);
      });
  };
  

  return (
    <div className='body'>
      <div className='searchbar'>
        <div className='logo'>
          <img className='image1' src={logo} alt='png'/>Cloud.Max
        </div>
        <div className='right'>
          <input
            type="text"
            className="city"
            value={city}
            placeholder='Enter Location Name ...'
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Check</button>
        </div>
      </div>
      
      {weatherData && (
        <div className="card">
          <div className="layer">
            <div className="card-place">
              <p className="city-name">{city}</p>
              <img className="image" src={image} alt="png" />
              <div className="result">
                <p>Temperature in Celsius: {weatherData.current.temp_c}°C</p>
                <p>Temperature in Fahrenheit: {weatherData.current.temp_f}°F</p>
                <p>Condition: {weatherData.current.condition.text}</p>
                <p>Region: {weatherData.location.region}</p>
                <p>Country: {weatherData.location.country}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Weather;
