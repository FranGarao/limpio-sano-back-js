const express = require("express");
const router = express.Router();
/**
    Controller
 */
const faqsController = require("../controllers/faqsController");
/**
    Routes
 */

//GET /api/categories
router.get("/", faqsController.getFaqs);

router.get("/:faqId", faqsController.faqById);

module.exports = router;
