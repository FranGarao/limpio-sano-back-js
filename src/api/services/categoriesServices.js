const { Category } = require("../db/models");

module.exports = {
  getCategories: async () => {
    const categories = await Category.findAll({ raw: true })
      .then((categories) => {
        return categories;
      })
      .catch((error) => {
        return error;
      });
    return categories;
  },
  categoryById(id) {
    return Category.findByPk(id)
      .then((category) => {
        return category;
      })
      .catch((error) => {
        return error;
      });
  },
  createCategory(title, img) {
    return Category.create({ title, img })
      .then((category) => {
        return category;
      })
      .catch((error) => {
        return error;
      });
  },
  updateCategory(id, title) {
    return Category.update({ title }, { where: { id } })
      .then((category) => {
        console.log(category);
        return category;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  deleteCategory(id) {
    return Category.destroy({ where: { id } })
      .then((category) => {
        return category;
      })
      .catch((error) => {
        return error;
      });
  },
};
