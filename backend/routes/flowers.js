const express = require("express");
const router = express.Router();
const Flower = require("../models/Flower");

router.get("/", async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const flower = await Flower.findOne({ id: req.params.id });
    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }
    res.json(flower);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
