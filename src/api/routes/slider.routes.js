const express = require("express");
const router = express.Router();
const { getSliderImages } = require("../controllers/Slider");

router.get("/", getSliderImages);

module.exports = router;
