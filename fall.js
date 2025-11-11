// Animation state management
let snowInterval = null;
let rainInterval = null;
let rainSound = null;

// Function to create snowflakes with better performance
function createSnowflakes() {
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 10; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDelay = `${Math.random() * 3}s`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 2}s`;
    
    // Remove snowflakes after animation ends
    snowflake.addEventListener("animationend", () => {
      snowflake.remove();
    });
    
    fragment.appendChild(snowflake);
  }
  
  document.body.appendChild(fragment);
}

// Function to create raindrops with better performance
function createRaindrops() {
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 20; i++) {
    const raindrop = document.createElement("div");
    raindrop.classList.add("raindrop");
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.animationDelay = `${Math.random() * 0.5}s`;
    raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
    
    // Remove raindrops after animation ends
    raindrop.addEventListener("animationend", () => {
      raindrop.remove();
    });
    
    fragment.appendChild(raindrop);
  }
  
  document.body.appendChild(fragment);
}

// Function to start snowfall effect
function startSnowfall() {
  if (snowInterval) return; // Prevent multiple intervals
  
  stopRainfall(); // Stop rain if active
  
  snowInterval = setInterval(createSnowflakes, 200);
}

// Function to start rainfall effect
function startRainfall() {
  if (rainInterval) return; // Prevent multiple intervals
  
  stopSnowfall(); // Stop snow if active
  
  rainInterval = setInterval(createRaindrops, 200);
  
  // Play rain sound with error handling
  try {
    rainSound = new Audio("RAIN.mp3");
    rainSound.loop = true;
    rainSound.volume = 0.3; // Lower volume for better UX
    rainSound.play().catch(err => console.log("Could not play rain sound:", err));
  } catch (err) {
    console.log("Rain sound not available:", err);
  }
}

// Function to stop snowfall effect
function stopSnowfall() {
  if (snowInterval) {
    clearInterval(snowInterval);
    snowInterval = null;
  }
  
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    const snowflakes = document.querySelectorAll(".snowflake");
    if (snowflakes.length > 0) {
      snowflakes.forEach((element) => element.remove());
    }
  });
}

// Function to stop rainfall effect
function stopRainfall() {
  if (rainInterval) {
    clearInterval(rainInterval);
    rainInterval = null;
  }
  
  if (rainSound) {
    rainSound.pause();
    rainSound = null;
  }
  
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    const raindrops = document.querySelectorAll(".raindrop");
    if (raindrops.length > 0) {
      raindrops.forEach((element) => element.remove());
    }
  });
}
