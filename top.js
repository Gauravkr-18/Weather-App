// Function to update the top section
function updateTopSection(data) {
  const cityName = data.city.name;
  const sunriseTime = new Date(data.city.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.city.sunset * 1000).toLocaleTimeString();
  const currentTemp = Math.round(data.list[0].main.temp);
  const currentWeather = data.list[0].weather[0].main.toLowerCase();
  const weatherIcon = getWeatherIcon(data.list[0].weather[0].main);

  document.getElementById("current-city").textContent = cityName;
  document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime}`;
  document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;
  document.querySelector(".current-temp h1").textContent = `${currentTemp}°C`;
  document.getElementById("current-weather").innerHTML = `<span style="font-size: 1.5em; margin-right: 10px;">${weatherIcon}</span>${currentWeather}`;
  
  // Update date
  const today = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-GB', options);
  document.getElementById("today").textContent = `Today - ${formattedDate}`;

  // Start appropriate animation based on current weather
  if (currentWeather.includes("snow")) {
    startSnowfall();
  } else if (currentWeather.includes("rain")) {
    startRainfall();
  } else {
    stopSnowfall();
    stopRainfall();
  }
}

// Helper function for weather icons
function getWeatherIcon(condition) {
  const icons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️'
  };
  return icons[condition] || '🌈';
}
