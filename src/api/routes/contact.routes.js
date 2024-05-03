const express = require("express");
const router = express.Router();
const jsonWebTokenMiddleware = require("../middlewares/jsonWebToken");

/**
    Controller
 */
const contactsController = require("../controllers/contactController");
/**
    Routes
 */

//GET /api/faqs
router.get("/", contactsController.getContacts);

router.get("/dash", jsonWebTokenMiddleware, contactsController.getContacts);

// router.get("/:faqId", faqsController.contactById);

// router.post("/create", faqsController.createContact);
router.delete("/delete/:id", jsonWebTokenMiddleware, contactsController.deleteContact);

router.put("/update/:id", jsonWebTokenMiddleware, contactsController.updateContact);

router.post("/submit", jsonWebTokenMiddleware, contactsController.submitEmail);

// router.delete("/delete/:faqId", faqsController.deleteContact);

module.exports = router;
