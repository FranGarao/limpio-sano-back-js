const usersService = require("../services/usersServices");
const { User } = require("../db/models");
const usersServices = require("../services/usersServices");
module.exports = {
  getUsers: async (_, res) => {
    try {
      const users = await usersService.getUsers();
      res.json({ ok: true, status: 200, users });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log({ "req.body": req.body });
      const newUser = await usersService.register(username, email, password);

      res.json({ ok: true, status: 200, message: "User created", newUser });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await usersService.login(username, email, password);
      if (!user) {
        res.json({ ok: false, status: 401, message: "Invalid password" });
      } else {
        usersServices.setCookies(req, res, user);
        res.json({ ok: true, status: 200, message: "Login success", user });
      }
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  /*    
garaofran@gmail.com
*/
  logOut: async (req, res) => {
    req.session.destroy((error) => {
      if (error) {
        console.log("Error al cerrar sesion", error);
      } else {
        res.clearCookie("token");
        res.json({ message: "Logged out" });
      }
    });
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersService.deleteUser(id);

      res.json({ ok: true, status: 200, message: "User deleted", user });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const user = await usersService.updateUser(id, username, email, password);

      res.json({ ok: true, status: 200, message: "User updated", user });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
};
