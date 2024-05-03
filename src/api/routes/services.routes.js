const express = require("express");
const router = express.Router();
const jsonWebTokenMiddleware = require("../middlewares/jsonWebToken");

/**
    Controller
 */
const servicesController = require("../controllers/servicesController");
/**
    Routes
 */

//GET /api/services
router.get("/", servicesController.getServices);

router.get("/dash", jsonWebTokenMiddleware, servicesController.getServices);

//POST /api/services/create
router.post(
  "/create",
    jsonWebTokenMiddleware,
  servicesController.createService
);

router.get("/category/:categoryId", servicesController.serviceByCategory);

//DELETE /api/services/delete/:serviceId
router.delete("/delete/:serviceId", jsonWebTokenMiddleware, servicesController.deleteService);

router.put("/update/:serviceId", jsonWebTokenMiddleware,servicesController.updateService);

module.exports = router;
