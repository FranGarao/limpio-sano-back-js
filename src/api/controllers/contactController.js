const contactServices = require("../services/contactServices");

module.exports = {
  getContacts: (req, res) => {
    contactServices
      .getContacts()
      .then((contacts) => {
        res.json(contacts);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  updateContact: (req, res) => {
    const id = req.params.contactId;
    const { info, type } = req.body;
    console.log(id, info, type);
    contactServices
      .updateContact(id, info, type)
      .then((contact) => {
        res.json(contact);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send;
      });
  },
};
