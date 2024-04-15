const usersService = require("../services/usersServices");

module.exports = {
  getUsers: async (_, res) => {
    try {
      const users = await usersService.getUsers();
      console.log(users);
      res.json({ ok: true, status: 200, users });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
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
      console.log(req.body);
      console.log("++++++++++++++++++++++++++++++");
      const user = await usersService.login(username, email, password);

      res.json({ ok: true, status: 200, message: "Login success", user });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
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
