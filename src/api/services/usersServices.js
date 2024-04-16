const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      const validPw = bcrypt.compareSync(password, user?.password);
      if (validPw) {
        return user;
      } else {
        return "Invalid password";
      }
    } catch (error) {
      console.log("ROMPIO aca");
      return error;
    }
  },
  setCookies: async (req, res, user) => {
    const token = jwt.sign({ id: user.id }, "pluto", {
      expiresIn: 60 * 60 * 24 * 365, // Expires in one year
    });
    const cookieOptions = {
      httpOnly: false,
      secure: true,
      domain: "localhost",
      path: "/",
      maxAge: 60 * 60 * 24,
      //! sameSite: "none",
    };

    console.log({ cookies: user });
    res.cookie("token", token, cookieOptions);
    // res.cookie("logged", username, cookieOptions);
    //TODO: revisar xq rompe
    req.session.user = user;
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
};
