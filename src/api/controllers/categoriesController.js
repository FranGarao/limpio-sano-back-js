const categoriesService = require("../services/categoriesServices");
const { login } = require("../services/usersServices");

module.exports = {
  getCategories: async (_, res) => {
    try {
      const categories = await categoriesService.getCategories();
      res.json({ ok: true, status: 200, categories });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  categoryById: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const category = await categoriesService.categoryById(categoryId);
      res.json({ ok: true, status: 200, category });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  }
};
