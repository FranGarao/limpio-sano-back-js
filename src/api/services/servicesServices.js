const { Service } = require("../db/models");

module.exports = {
  getServices: async () => {
    try {
      const services = await Service.findAll({ raw: true });
      return services;
    } catch (error) {
      console.log("ROMPIO");
      return error;
    }
  },
  serviceByCategory: async (categoryId) => {
    try {
      const services = await Service.findAll({
        where: { category_id: categoryId },
        raw: true,
      });
      return services;
    } catch (error) {
      console.log("ROMPIO");
      return error;
    }
  },
};
