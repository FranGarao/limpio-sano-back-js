const express = require("express");
const router = express.Router();
/**
    Controller
 */
const usersController = require("../controllers/usersController");
const jsonWebTokenMiddleware = require("../middlewares/jsonWebToken");
/**
    Routes
 */

//GET /api/users
router.get("/", jsonWebTokenMiddleware, usersController.getUsers);

//GET /api/users/login
router.post("/login", usersController.login);

//GET api/users/logout
router.post("/logout", usersController.logOut);

//POST /api/users/register
router.post("/register", usersController.register);

//UPDATE /api/users/update/:id
router.put(
  "/update/:id",
  //   jsonWebTokenMiddleware,
  usersController.updateUser
);

//DELETE /api/users/register
router.delete(
  "/delete/:id",
  jsonWebTokenMiddleware,
  usersController.deleteUser
);

//GET /api/users/authenticate
router.get("/authenticate", usersController.getCode);

router.post("/code", usersController.submitCode);

//PUT /api/users/authenticate/:code
// router.put("/authenticate/:id", usersController.putCode);

//POST /api/users/verify/:code
router.post("/verify", usersController.verifyCode);

module.exports = router;
