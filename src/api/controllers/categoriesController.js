const categoriesService = require("../services/categoriesServices");
const { login } = require("../services/usersServices");

module.exports = {
  getCategories: async (_, res) => {
    try {
      const categories = await categoriesService.getCategories();
      console.log(categories);
      res.json({ ok: true, status: 200, categories });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
};
