import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import insightsRoutes from "./routes/insights.js";
import aqiRoutes from "./routes/aqi.js";
import forecastRoutes from "./routes/forecast.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/insights", insightsRoutes);
app.use("/api/aqi", aqiRoutes);
app.use("/api/forecast", forecastRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ENVIOmeteor backend running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
