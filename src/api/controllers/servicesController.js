const servicesService = require("../services/servicesServices");

module.exports = {
  getServices: async (_, res) => {
    try {
      const services = await servicesService.getServices();
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
      const newService = await servicesService.createService(service);
      res.json({ ok: true, status: 201, newService });
    } catch (error) {
      res.json({ ok: false, status: 500, error });
    }
  },
  updateService: async (req, res) => {
    const { serviceId } = req.params;
    const service = {
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
      category_id: Number(req.body.category_id),
    };
    try {
      const updatedService = await servicesService.updateService(
        serviceId,
        service
      );
      res.json({ ok: true, status: 200, updatedService });
    } catch (error) {
      res.json({ ok: false, status: 500, error });
    }
  },
  deleteService: async (req, res) => {
    const { serviceId } = req.params;
    try {
      const deletedService = await servicesService.deleteService(serviceId);
      res.json({ ok: true, status: 200, deletedService });
    } catch (error) {
      res.json({ ok: false, status: 500, error });
    }
  },
};
