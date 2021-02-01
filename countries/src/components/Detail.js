import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Detail = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [ weather, setWeather ] = useState({
    current: {
      temperature: 0,
      weather_icons: '',
      wind_speed: 0,
      wind_dir: 'N',
    }
  });

  useEffect(() => {
    axios
      .get('/current', {
        baseURL: 'http://api.weatherstack.com',
        params: {
          access_key: api_key,
          query: `${country.capital}, ${country.name}`,
        }
      })
      .then(response => {
        setWeather(response.data);
      });
  }, [api_key, country.capital, country.name]);

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} height="100px" />
      <h2>Weather in {country.capital}</h2>
      <h3>temperature: {weather.current.temperature} Celsius</h3>
      <img src={weather.current.weather_icons} alt="weather icon" height="50px" />
      <h3>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h3>
    </>
  );
}

export default Detail;