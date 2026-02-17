import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude required" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("FORECAST ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: "Forecast fetch failed",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
