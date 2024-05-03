const express = require("express");
const router = express.Router();
const jsonWebTokenMiddleware = require("../middlewares/jsonWebToken");

/**
    Controller
 */
const categoriesController = require("../controllers/categoriesController");

/**
    Routes
 */

//GET /api/categories
router.get("/", categoriesController.getCategories);

router.get("/dash", jsonWebTokenMiddleware,categoriesController.getCategories);

router.get("/:categoryId", categoriesController.categoryById);

router.post("/create", jsonWebTokenMiddleware,categoriesController.createCategory);

router.put("/update/:categoryId", jsonWebTokenMiddleware, categoriesController.updateCategory);

router.delete("/delete/:categoryId", jsonWebTokenMiddleware, categoriesController.deleteCategory);

module.exports = router;
