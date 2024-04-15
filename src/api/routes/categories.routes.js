const express = require("express");
const router = express.Router();
/**
    Controller
 */
const categoriesController = require("../controllers/categoriesController");
/**
    Routes
 */

//GET /api/categories
router.get("/", categoriesController.getCategories);

router.get("/:categoryId", categoriesController.categoryById);

module.exports = router;
