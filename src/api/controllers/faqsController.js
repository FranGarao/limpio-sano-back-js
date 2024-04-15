const faqsServices = require('../services/faqsServices');

module.exports = {
    getFaqs: async (req, res) => {
        const faqs = await faqsServices.getFaqs();
        res.json(faqs);
    },
    faqById: async (req, res) => {
        const { id } = req.params;
        const faq = await faqsServices.faqById(id);
        res.json(faq);
    }
}