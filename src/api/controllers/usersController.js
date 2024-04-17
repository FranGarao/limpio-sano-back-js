const usersService = require("../services/usersServices");
const { User } = require("../db/models");
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
      console.log(req.cookies);
      const { username, email, password } = req.body;
      const user = await usersService.login(username, email, password);
      console.log(user);
      usersService.setCookies(req, res, user);
      res.json({ ok: true, status: 200, message: "Login success", user });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  // setCookies: async (req, res, user) => {
  //   const userLogin = await User.findByPk(2);
  //   console.log(userLogin);
  //   usersService.setCookies(req, res, user);
  //   res.json({ ok: true, status: 200, message: "Cookies set" });
  // },
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
};
