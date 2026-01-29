const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

/**
 * Fetch weather info for a given city/state
 * Returns { Temp, Humidity, Rainfall }
 */
export const getWeatherByCity = async (city) => {
  try {
    // Fallback defaults if city is not provided
    if (!city) return { Temp: 25, Humidity: 60, Rainfall: 500 };

    if (!API_KEY) {
      console.warn("OpenWeather API key not found. Using fallback data.");
      return { Temp: 25, Humidity: 60, Rainfall: 500 };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      console.error("Weather API error:", data.message);
      return { Temp: 25, Humidity: 60, Rainfall: 500 }; // fallback
    }

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    let rainfall = 0;

    // Check for rain volume
    if (data.rain) rainfall = data.rain["1h"] || data.rain["3h"] || 0;

    return { Temp: temp, Humidity: humidity, Rainfall: rainfall };
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    return { Temp: 25, Humidity: 60, Rainfall: 500 }; // fallback
  }
};
