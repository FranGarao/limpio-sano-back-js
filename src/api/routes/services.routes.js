const express = require("express");
const router = express.Router();
/**
    Controller
 */
const servicesController = require("../controllers/servicesController");
const jsonWebTokenMiddleware = require("../middlewares/jsonWebToken");
/**
    Routes
 */

//GET /api/services
router.get("/", jsonWebTokenMiddleware, servicesController.getServices);

router.get("/:categoryId", servicesController.serviceByCategory);

module.exports = router;
