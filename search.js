// Function to handle the search input and fetch new data
function getWeather() {
  city = document.getElementById("searchInput").value.trim() || city; // Get city from search box
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  fetchWeatherData(city); // Fetch weather for the new city
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Fetch weather data for default city
  fetchWeatherData();
  
  // Set up search functionality
  const searchButton = document.querySelector("button");
  const searchInput = document.getElementById("searchInput");
  
  if (searchButton) {
    searchButton.addEventListener("click", getWeather);
  }
  
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        getWeather();
      }
    });
  }
});
