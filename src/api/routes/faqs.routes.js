const express = require("express");
const router = express.Router();
/**
    Controller
 */
const faqsController = require("../controllers/faqsController");
/**
    Routes
 */

//GET /api/faqs
router.get("/", faqsController.getFaqs);

router.get("/:faqId", faqsController.faqById);

router.post("/create", faqsController.createFaq);

router.put("/update/:faqId", faqsController.updateFaq);

router.delete("/delete/:faqId", faqsController.deleteFaq);

module.exports = router;
