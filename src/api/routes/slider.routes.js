const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/sliderController");

router.get("/", sliderController.getSliderImages);

router.post("/create", sliderController.createSliderImage);

router.put("/update/:id", sliderController.updateSliderImage);

router.delete("/delete/:id", sliderController.deleteSliderImage);

module.exports = router;
