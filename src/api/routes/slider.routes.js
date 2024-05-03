const express = require("express");
const router = express.Router();
const jsonWebTokenMiddleware = require("../middlewares/jsonWebToken");


const sliderController = require("../controllers/sliderController");

router.get("/", sliderController.getSliderImages);

router.get("/dash", jsonWebTokenMiddleware, sliderController.getSliderImages);

router.post("/create",jsonWebTokenMiddleware, sliderController.createSliderImage);

router.put("/update/:id", jsonWebTokenMiddleware, sliderController.updateSliderImage);

router.delete("/delete/:id", jsonWebTokenMiddleware, sliderController.deleteSliderImage);

module.exports = router;
