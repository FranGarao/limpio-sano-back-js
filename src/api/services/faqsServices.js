const { Faq } = require("../db/models");

module.exports = {
  getFaqs: async () => {
    const faqs = await Faq.findAll({ raw: true })
      .then((faqs) => {
        return faqs;
      })
      .catch((error) => {
        return error;
      });
    return faqs;
  },
  faqById(id) {
    return Faq.findByPk(id)
      .then((faq) => {
        return faq;
      })
      .catch((error) => {
        return error;
      });
  },
};
