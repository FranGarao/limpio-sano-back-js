const usersService = require("../services/usersServices");
const { User, QrCode } = require("../db/models");
const usersServices = require("../services/usersServices");
const speakEasy = require("speakeasy");
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

  getCode: async (req, res) => {
    try {
      // const code = await usersService.getCode();
      // if (!user) {
      //   res.json({ ok: false, status: 404, message: "User not found" });
      // }
      const secret = speakEasy.generateSecret({
        name: "limpio_sano",
        length: 20,
      });

      const qrSrc = await usersService.generateQr(secret);
      res.json({ ok: true, status: 200, qrSrc, secret });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  submitCode: async (req, res) => {
    try {
      const { ascii } = req.body;
      const qrCode = {
        code: ascii,
        user_id: 2,
      };
      console.log({ reqqqq: req.body });
      const code = await QrCode.create(qrCode);
      console.log({ code });
      res.json({
        ok: true,
        status: 200,
        message: "Code submitted",
      });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  verifyCode: async (req, res) => {
    console.log({ req: req.body });
    //TODO: cambiar el origen del token
    const { faCode } = req.body;
    const secret = await QrCode.findOne({ raw: true, where: { user_id: 2 } });
    try {
      const verified = speakEasy.totp.verify({
        secret: secret?.code,
        encoding: "ascii",
        token: faCode,
      });
      const user = await User.findByPk(2);
      if (verified) {
        usersServices.setCookies(req, res, user);
      }
      console.log({ secret: secret.code, token: faCode, verified });
      res.json({ ok: true, status: 200, verified });
    } catch (error) {
      console.error("Error al verificar el código:", error);
    }
  },
};
