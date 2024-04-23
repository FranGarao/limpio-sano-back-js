const { Contact } = require("../db/models");

module.exports = {
  getContacts: async () => {
    const contacts = await Contact.findAll({ raw: true })
      .then((contacts) => {
        return contacts;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    return contacts;
  },
  contactById(id) {
    return Contact.findByPk(id)
      .then((contact) => {
        return contact;
      })
      .catch((error) => {
        return error;
      });
  },
  createContact(name, email, message) {
    return Contact.create({ name, email, message })
      .then((contact) => {
        return contact;
      })
      .catch((error) => {
        return error;
      });
  },
  updateContact(id, info, type) {
    console.log({ info});
    return Contact.update({ info, type }, { where: { id } })
      .then((contact) => {
        return contact;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};