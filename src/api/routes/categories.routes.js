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

router.post("/create", categoriesController.createCategory);

router.put("/update/:categoryId", categoriesController.updateCategory);

router.delete("/delete/:categoryId", categoriesController.deleteCategory);

module.exports = router;
