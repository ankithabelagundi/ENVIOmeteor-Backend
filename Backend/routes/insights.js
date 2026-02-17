import express from "express";
import axios from "axios";
import { generateSuggestions } from "../utils/suggestions.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const weatherRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    const aqiRes = await axios.get(
      "http://api.openweathermap.org/data/2.5/air_pollution",
      {
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    const suggestions = generateSuggestions(
      weatherRes.data,
      aqiRes.data
    );

    res.json({
      weather: weatherRes.data,
      aqi: aqiRes.data,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

export default router;
