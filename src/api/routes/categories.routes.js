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

module.exports = router;
