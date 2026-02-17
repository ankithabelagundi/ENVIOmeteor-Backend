export function generateSuggestions(weatherData, aqiData) {
  const suggestions = [];

  // 🌧️ Rain check
  if (
    weatherData.rain &&
    (weatherData.rain["1h"] > 0.5 || weatherData.rain["3h"] > 1)
  ) {
    suggestions.push("Carry an umbrella ☔ Heavy rain expected");
  }

  // 🔥 Heat check
  if (weatherData.main.temp >= 35) {
    suggestions.push("Too hot today 🔥 Avoid outdoor activities in afternoon");
  }

  // 🌞 UV / sunny logic (basic)
  if (weatherData.weather[0].main === "Clear") {
    suggestions.push("Sunny day 🌞 Use sunscreen if going out");
  }

  // 😷 AQI check
  const aqi = aqiData.list[0].main.aqi;

  if (aqi >= 4) {
    suggestions.push("Air quality is poor 😷 Avoid walking outdoors");
  } else if (aqi === 3) {
    suggestions.push("Moderate air quality ⚠️ Light outdoor activity only");
  } else {
    suggestions.push("Air quality is good ✅ Great day for walking");
  }

  return suggestions;
}
