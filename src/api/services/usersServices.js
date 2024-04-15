const { log } = require("console");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
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
      console.log("ROMPIO");
      return error;
    }
  },
  login: async (username, email, password) => {
    try {
      console.log("username: ", username);
      console.log("email: ", email);
      console.log("password: ", password);
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
