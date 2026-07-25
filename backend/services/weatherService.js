const axios = require("axios");

async function getWeather(city) {
  try {
    const geoResponse = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      return "City not found.";
    }

    const place = geoResponse.data.results[0];

    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m,weather_code`
    );

    const current = weatherResponse.data.current;

    return `📍 ${place.name}, ${place.country}

🌡 Temperature: ${current.temperature_2m}°C

💨 Wind Speed: ${current.wind_speed_10m} km/h

☁ Weather Code: ${current.weather_code}`;
  } catch (error) {
    console.error(error);
    return "Unable to fetch weather.";
  }
}

module.exports = {
  getWeather,
}; 