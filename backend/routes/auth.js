const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const gardenController = require("../controllers/garden");
const User = require("../models/user");

const router = express.Router();

// Authentication routes
router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

// Garden management routes
router.get("/garden", gardenController.getGarden);

router.post(
  "/garden/add-flower",
  [
    body("flowerId")
      .isMongoId()
      .withMessage("Please provide a valid flower ID."),
    body("name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Flower name is required."),
  ],
  gardenController.postAddFlower
);

router.post(
  "/garden/water/:flowerId",
  [
    body("flowerId")
      .isMongoId()
      .withMessage("Please provide a valid flower ID."),
  ],
  gardenController.postWaterFlower
);

router.post(
  "/garden/update-growth/:flowerId",
  [
    body("flowerId")
      .isMongoId()
      .withMessage("Please provide a valid flower ID."),
    body("growthStage")
      .isIn(["sprout", "grown", "fully_grown"])
      .withMessage("Invalid growth stage."),
  ],
  gardenController.postUpdateGrowth
);

router.post(
  "/garden/update-mastery/:flowerId",
  [
    body("flowerId")
      .isMongoId()
      .withMessage("Please provide a valid flower ID."),
    body("mastery")
      .isIn(["beginner", "intermediate", "advanced", "expert", "master"])
      .withMessage("Invalid mastery level."),
  ],
  gardenController.postUpdateMastery
);

router.delete("/garden/remove-flower/:flowerId", gardenController.deleteFlower);

router.get("/garden/flowers/:stage", gardenController.getFlowersByStage);

router.get("/garden/watering-due", gardenController.getFlowersNeedingWater);

module.exports = router;
