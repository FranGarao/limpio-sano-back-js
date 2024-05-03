const express = require("express");
const router = express.Router();
/**
    Controller
 */
const contactsController = require("../controllers/contactController");
/**
    Routes
 */

//GET /api/faqs
router.get("/", contactsController.getContacts);

router.get("/dash", contactsController.getContacts);

// router.get("/:faqId", faqsController.contactById);

// router.post("/create", faqsController.createContact);
router.delete("/delete/:id", contactsController.deleteContact);

router.put("/update/:id", contactsController.updateContact);

router.post("/submit", contactsController.submitEmail);

// router.delete("/delete/:faqId", faqsController.deleteContact);

module.exports = router;
