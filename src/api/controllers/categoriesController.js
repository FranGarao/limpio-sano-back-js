const { create } = require("domain");
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
  },
  createCategory: async (req, res) => {
    try {
      const { title, img } = req.body;
      const newCategory = await categoriesService.createCategory(title, img);
      res.json({
        ok: true,
        status: 200,
        message: "Category created",
        newCategory,
      });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { category } = req.body;
      const updatedCategory = await categoriesService.updateCategory(
        categoryId,
        category
      );
      res.json({
        ok: true,
        status: 200,
        message: "Category updated",
        updatedCategory,
      });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const deletedCategory =
        await categoriesService.deleteCategory(categoryId);
      res.json({
        ok: true,
        status: 200,
        message: "Category deleted",
        deletedCategory,
      });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, status: 500, error });
    }
  },
};
