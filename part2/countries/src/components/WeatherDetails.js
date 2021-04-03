import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherDetails = ({ cityName }) => {
    const [weather, setWeather] = useState(null);

    const getWeather = () => {
        const api_key = process.env.REACT_APP_API_KEY;
        let weatherURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${cityName}`;

        axios.get(weatherURL).then((response) => {
            const weatherObject = {
                temp: response.data.current.temperature,
                icon: response.data.current.weather_icons[0],
                windDir: response.data.current.wind_dir,
                windSpeed: response.data.current.wind_speed
            };
            setWeather(weatherObject);
        });
    };

    useEffect(getWeather, []);

    if (weather !== null) {
        return (
            <div>
                <h4>Temperature: {weather.temp}</h4>
                <img src={weather.icon} />
                <h4>Wind speed: {weather.windSpeed}</h4>
                <h4>Wind Direction: {weather.windDir}</h4>
            </div>
        );
    } else {
        return <div>There is no weather information at the moment</div>;
    }
};

export default WeatherDetails;
