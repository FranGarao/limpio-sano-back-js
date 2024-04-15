const express = require("express");
const router = express.Router();
/**
    Controller
 */
const usersController = require("../controllers/usersController");
/**
    Routes
 */

//GET /api/users
router.get("/", usersController.getUsers);

//GET /api/users/login
router.post("/login", usersController.login);

//POST /api/users/cookies
router.get("/cookies", usersController.setCookies);

//POST /api/users/register
router.post("/register", usersController.register);

//DELETE /api/users/register
router.delete("/delete/:id", usersController.deleteUser);

module.exports = router;
