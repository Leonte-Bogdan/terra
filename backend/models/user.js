const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  garden: {
    flowers: [
      {
        flowerId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Flower",
        },
        name: {
          type: String,
          required: true,
        },
        description: String,
        image: String,
        category: {
          type: String,
          default: "flowers",
        },
        growthStage: {
          type: String,
          enum: ["sprout", "grown", "fully_grown"],
          default: "sprout",
          required: true,
        },
        mastery: {
          type: String,
          enum: ["beginner", "intermediate", "advanced", "expert", "master"],
          default: "beginner",
          required: true,
        },
        wateringSchedule: {
          frequency: {
            type: Number,
            default: 3,
            min: 1,
            max: 30,
          },
          lastWatered: {
            type: Date,
            default: Date.now,
          },
          nextWateringDue: Date,
        },
        growthTiming: {
          plantedDate: {
            type: Date,
            default: Date.now,
          },
          daysUntilNextPhase: {
            type: Number,
            default: 7,
            min: 0,
          },
          expectedNextPhaseDate: Date,
        },
        health: {
          type: Number,
          min: 0,
          max: 100,
          default: 100,
        },
        experiencePoints: {
          type: Number,
          default: 0,
          min: 0,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
