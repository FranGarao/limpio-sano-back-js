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
  createFaq(title, content) {
    return Faq.create({ title, content })
      .then((faq) => {
        return faq;
      })
      .catch((error) => {
        return error;
      });
  },
  updateFaq(id, title, description) {
    return Faq.update({ title, description }, { where: { id } })
      .then((faq) => {
        return faq;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  deleteFaq(id) {
    return Faq.destroy({ where: { id } })
      .then((faq) => {
        return faq;
      })
      .catch((error) => {
        return error;
      });
  },
};
