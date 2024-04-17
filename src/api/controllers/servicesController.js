const servicesService = require("../services/servicesServices");

module.exports = {
  getServices: async (_, res) => {
    try {
      const services = await servicesService.getServices();
      console.log(services);
      res.json({ ok: true, status: 200, services });
    } catch (error) {
      res.json({ ok: false, status: 500, error });
    }
  },
  serviceByCategory: async (req, res) => {
    const { categoryId } = req.params;
    try {
      const services = await servicesService.serviceByCategory(categoryId);

      res.json({ ok: true, status: 200, services });
    } catch (error) {
      res.json({ ok: false, status: 500, error });
    }
  },
  createService: async (req, res) => {
    const service = req.body;
    try {
      console.log({ service });
      // if (!service.category_id) {
      //   service.category_id = 10;
      // }
      const newService = await servicesService.createService(service);
      res.json({ ok: true, status: 201, newService });
    } catch (error) {
      res.json({ ok: false, status: 500, error });
    }
  },
};
