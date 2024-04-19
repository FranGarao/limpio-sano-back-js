const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersController = require("../controllers/usersController");
const speakEasy = require("speakeasy");
const qrcode = require("qrcode");
module.exports = {
  getUsers: async () => {
    try {
      const users = await User.findAll({ raw: true });
      return users;
    } catch (error) {
      console.log("ROMPIO");
      return error;
    }
  },
  checkUserRegistered: async (username) => {
    try {
      const user = await User.findOne({ where: { username, email } });
      return user;
    } catch (error) {
      console.log("ROMPIO");
      return error;
    }
  },
  register: async (username, email, password) => {
    try {
      const hashedPw = bcrypt.hashSync(password, 11);
      const newUser = {
        username,
        email,
        password: hashedPw,
      };
      // const userRegistered = await checkUserRegistered(username);
      // if (userRegistered) {
      //   throw new Error("User already exists");
      // }
      const user = await User.create(newUser);
      return user;
    } catch (error) {
      console.log("ROMPIOaaaa");
      return error;
    }
  },
  login: async (username, email, password) => {
    try {
      const user = await User.findOne({
        where: { username, email },
        raw: true,
      });
      if (user) {
        console.log(user);
        const validPw = bcrypt.compareSync(password, user?.password);
        if (validPw) {
          return user;
        } else {
          return { error: "Invalid password" };
        }
      } else {
        return { error: "Email o Username invalidos." };
      }
    } catch (error) {
      console.log({ error });
      return error;
    }
  },
  setCookies: async (req, res, user) => {
    if (user.error) {
      return user.error;
    } else {
      const token = jwt.sign({ id: user.id }, "pluto", {
        expiresIn: 60 * 60 * 24 * 365,
      });
      const cookieOptions = {
        httpOnly: false,
        secure: true,
        domain: "localhost",
        path: "/",
        maxAge: 60 * 60 * 24,
        //! sameSite: "none",
      };
      res.cookie("token", token, cookieOptions);
      //TODO: revisar xq rompe
      req.session.user = user;
    }
  },
  // setCookies: async (_, res, user) => {
  //   res.cookie("user", user.username, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "none",
  //   });
  //   res.cookie("email", user.email, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "none",
  //   });
  // },
  deleteUser: async (id) => {
    try {
      const user = await User.destroy({ where: { id } });
      return user;
    } catch (error) {
      console.log("ROMPIO");
      return error;
    }
  },
  updateUser: async (id, username, email, password) => {
    try {
      const hashedPw = bcrypt.hashSync(password, 11);
      const user = await User.update(
        { username, email, password: hashedPw },
        { where: { id } }
      );
      return user;
    } catch (error) {
      console.log("ROMPIO");
      return error;
    }
  },
  generateQr: async (secret) => {
    try {
      const data_url = await new Promise((resolve, reject) => {
        qrcode.toDataURL(secret.otpauth_url, (err, url) => {
          if (err) reject(err);
          else resolve(url);
        });
      });

      // Aquí puedes usar data_url fuera de la función
      return data_url;
    } catch (error) {
      console.error("Error al generar el QR:", error);
    }
  },
  putCode: async (_, res, id, secret) => {
    try {
      const user = await User.findByPk(id);
      await user.update({ secret });
      res.json({ ok: true, status: 200, message: "Secret added", user });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  submitCode: async (secret) => {
    try {
      const user = await User.findByPk(2);
      await user.update({ secret });
      return user;
    } catch (error) {
      console.log(error);
    }
  },
};
