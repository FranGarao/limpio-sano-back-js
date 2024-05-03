const contactServices = require("../services/contactServices");
const { Category } = require("../db/models");

module.exports = {
  getContacts: (req, res) => {
    contactServices
      .getContacts()
      .then((contacts) => {
        res.json({ ok: true, status: 200, contacts });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  updateContact: (req, res) => {
    const id = req.params.id;
    const { contact, type } = req.body;
    console.log(id, contact, type);
    contactServices
      .updateContact(id, contact, type)
      .then((contact) => {
        res.json({ ok: true, status: 200, contact });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send;
      });
  },
  submitEmail: async (req, res) => {
    const establishment = await Category.findByPk(
      req.body.data.establishmentRequired,
      { raw: true }
    );
    console.log({ establishment });
    const email = {
      client: {
        name: req.body.data.nameRequired,
        lastName: req.body.data.lastNameRequired,
        businness: req.body.data.bussinesRequired,
      },
      email: req.body.data.emailRequired,
      phone: req.body.data.phoneRequired,
      city: req.body.data.cityRequired,
      establishment: establishment.title,
      service: req.body.data.serviceRequired,
      startDate: req.body.data.startDateRequired,
      endDate: req.body.data.endRequired,
      msg: req.body.data.msgRequired,
    };
    console.log({ body: req.body });
    console.log({ email });
    contactServices.submitEmail(email);
    // .then((response) => {
    //   res.json(response);
    // })
    // .catch((error) => {
    //   console.log(error);
    //   res.status(500).send(error);
    // });
  },
  deleteContact: (req, res) => {
    const id = req.params.id;
    contactServices
      .deleteContact(id)
      .then((contact) => {
        res.json(contact);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send;
      });
  },
};
