const express = require("express");
const router = express.Router();
/**
    Controller
 */
const servicesController = require("../controllers/servicesController");
/**
    Routes
 */

//GET /api/services
router.get("/", servicesController.getServices);

router.get("/:categoryId", servicesController.serviceByCategory);

module.exports = router;
