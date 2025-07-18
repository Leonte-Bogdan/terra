const mongoose = require("mongoose");

const flowerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  waterLevel: {
    type: Number,
    default: 75,
    min: 0,
    max: 100,
  },
  lastWatered: {
    type: Date,
    default: Date.now,
  },
  wateringHistory: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      waterLevel: {
        type: Number,
        required: true,
      },
      previousLevel: {
        type: Number,
        required: true,
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: "windowsill",
  },
  fertilizerLevel: {
    type: Number,
    default: 50,
    min: 0,
    max: 100,
  },
  lastFertilized: {
    type: Date,
    default: Date.now,
  },
  soilPH: {
    type: Number,
    default: 7.0,
    min: 0,
    max: 14,
  },
  lastPruned: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Flower", flowerSchema, "gardenCollection");
