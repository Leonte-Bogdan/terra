const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
const flowerRoutes = require("./routes/flowers");
const authRoutes = require("./routes/auth.js");

app.use("/api/auth", authRoutes);
app.use("/api/flowers", flowerRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Terra Backend API" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
