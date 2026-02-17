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
      "http://api.openweathermap.org/data/2.5/air_pollution",
      {
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch AQI data" });
  }
});

export default router;
