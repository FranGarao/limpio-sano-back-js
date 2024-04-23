const { create } = require("domain");
const faqsServices = require("../services/faqsServices");

module.exports = {
  getFaqs: async (req, res) => {
    const faqs = await faqsServices.getFaqs();
    console.log(faqs);
    res.json(faqs);
  },
  faqById: async (req, res) => {
    const { id } = req.params;
    const faq = await faqsServices.faqById(id);
    res.json(faq);
  },
  createFaq: async (req, res) => {
    const newFaq = {
      title: req.body.title,
      description: req.body.description,
    };
    console.log(newFaq);
    const faq = await faqsServices.createFaq(
      req.body.title,
      req.body.description
    );
    res.json({ ok: true, status: 200, faq });
  },
  updateFaq: async (req, res) => {
    try {
      const { faqId } = req.params;
      const { title, description } = req.body;
      console.log(req.body);
      const faq = await faqsServices.updateFaq(faqId, title, description);
      console.log(faq);
      res.json(faq);
    } catch (error) {
      console.log(error);
    }
  },
  deleteFaq: async (req, res) => {
    const { faqId } = req.params;
    const faq = await faqsServices.deleteFaq(faqId);
    res.json(faq);
  },
};
