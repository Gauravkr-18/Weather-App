// API Key and Default City
const apiKey = "6b6fa79b7de4f3b86c78607dd9d8ede2";
let city = "Delhi"; // Default city

// Cache configuration
const cacheDuration = 300000; // 5 minutes in milliseconds
const weatherCache = {};

// Predefined times for displaying forecast
const predefinedTimes = [
  "12 AM",
  "3 AM",
  "6 AM",
  "9 AM",
  "12 PM",
  "3 PM",
  "6 PM",
  "9 PM",
];

// Function to get cached data
function getCachedData(city) {
  const cached = weatherCache[city];
  if (cached && (Date.now() - cached.timestamp) < cacheDuration) {
    return cached.data;
  }
  return null;
}

// Function to set cached data
function setCachedData(city, data) {
  weatherCache[city] = {
    data: data,
    timestamp: Date.now()
  };
}

// Function to show loading state
function showLoading() {
  const container = document.getElementById('weather-container');
  if (container) {
    container.style.opacity = '0.5';
    container.style.pointerEvents = 'none';
  }
}

// Function to hide loading state
function hideLoading() {
  const container = document.getElementById('weather-container');
  if (container) {
    container.style.opacity = '1';
    container.style.pointerEvents = 'auto';
  }
}

// Function to show error message
function showError(message) {
  alert(`Error: ${message}`);
}

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city = "Delhi") {
  // Check cache first
  const cachedData = getCachedData(city);
  if (cachedData) {
    updateTopSection(cachedData);
    updateWeatherCards(cachedData);
    updateTimeTempValues(cachedData);
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    showLoading();
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    
    // Cache the data
    setCachedData(city, data);
    
    updateTopSection(data);
    updateWeatherCards(data);
    updateTimeTempValues(data);
    hideLoading();
  } catch (error) {
    hideLoading();
    console.error("Failed to fetch weather data:", error);
    showError(error.message || "Failed to fetch weather data. Please try again.");
  }
}
