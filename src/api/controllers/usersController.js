const usersService = require("../services/usersServices");
const { User, QrCode } = require("../db/models");
const usersServices = require("../services/usersServices");
const speakEasy = require("speakeasy");
const moment = require("moment-timezone");
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
      console.log({ req: req.body });
      const { secret, userId } = req.body;
      console.log(userId);
      const qrCode = {
        code: secret?.ascii,
        user_id: userId,
      };
      const repeatedCode = await QrCode.findOne({ where: { user_id: userId } });
      if (repeatedCode) {
        await repeatedCode.update(qrCode);
        return res.json({
          ok: true,
          status: 200,
          message: "Code updated",
        });
      }
      await QrCode.create(qrCode);
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
    moment.tz.setDefault("America/Argentina/Buenos_Aires");
    const { faCode } = req?.body;
    const { userId } = req?.body;
    const secret = await QrCode.findOne({ raw: true, where: { user_id: 2 } });
    try {
      const verified = speakEasy.totp.verify({
        secret: secret?.code,
        encoding: "ascii",
        token: faCode,
        window: 1,
      });
      const user = await User.findByPk(userId);
      if (verified) {
        usersServices.setCookies(req, res, user);
      }
      console.log({ secret: secret.code, token: faCode, verified });
      console.log(new Date());
      res.json({ ok: true, status: 200, verified });
    } catch (error) {
      console.error("Error al verificar el código:", error);
    }
  },
};
