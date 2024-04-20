const { Service } = require("../db/models");

module.exports = {
  getServices: async () => {
    try {
      const services = await Service.findAll({ raw: true });
      console.log(services);
      return services;
    } catch (error) {
      console.log({ error });
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
      console.log({ error });
      return error;
    }
  },
  createService: async (service) => {
    try {
      console.log(service);
      const newService = await Service.create(service);
      console.log(service.img);
      return newService;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  updateService: async (serviceId, service) => {
    try {
      const updatedService = await Service.update(service, {
        where: { id: serviceId },
      });
      console.log({ updatedService });
      return updatedService;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  deleteService: async (serviceId) => {
    try {
      const deletedService = await Service.destroy({
        where: { id: serviceId },
      });
      return deletedService;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
