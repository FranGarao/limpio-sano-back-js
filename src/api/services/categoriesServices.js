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
};
