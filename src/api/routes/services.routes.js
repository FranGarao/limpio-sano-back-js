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
router.get("/", servicesController.getServices);

//POST /api/services/create
router.post(
  "/create",
  //   jsonWebTokenMiddleware,
  servicesController.createService
);


router.get("/:categoryId", servicesController.serviceByCategory);

//DELETE /api/services/delete/:serviceId
router.delete("/delete/:serviceId", servicesController.deleteService);

router.put("/update/:serviceId", servicesController.updateService);

module.exports = router;
