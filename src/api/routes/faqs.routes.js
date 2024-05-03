const express = require("express");
const router = express.Router();
const jsonWebTokenMiddleware = require("../middlewares/jsonWebToken");

/**
    Controller
 */
const faqsController = require("../controllers/faqsController");
/**
    Routes
 */

//GET /api/faqs
router.get("/",  faqsController.getFaqs);
router.get("/dash", jsonWebTokenMiddleware, faqsController.getFaqs);

router.get("/:faqId", faqsController.faqById);

router.post("/create", jsonWebTokenMiddleware,faqsController.createFaq);

router.put("/update/:faqId", jsonWebTokenMiddleware,faqsController.updateFaq);

router.delete("/delete/:faqId", jsonWebTokenMiddleware, faqsController.deleteFaq);

module.exports = router;
