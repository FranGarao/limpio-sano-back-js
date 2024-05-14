const { Contact } = require("../db/models");
const nodemailer = require("nodemailer");

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
    console.log({ id, info, type });
    return Contact.update({ contact: info, type }, { where: { id } })
      .then((contact) => {
        return contact;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
  async submitEmail(email) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email", //smtp.gmail.com para gmail
        port: 465,
        secure: true,
        auth: {
          user: "garaofran@gmail.com",
          pass: "wgpr tsxm imus kdmj",
        },
      });
      const client = {
        name: email.client.name
          ? email.client.name + email.client.lastname
          : email.client.businness,
      };
      const user = {
        client,
        email: email.email,
        phone: email.phone,
        city: email.city,
        establishment: email.establishment,
        service: email.service,
        startDate: email.startDate,
        endDate: email.endDate,
        message: email.msg,
      };
// Accede a la sección de configuración de tu cuenta de Google en la aplicación o el dispositivo que estés intentando configurar. Sustituye tu contraseña por la contraseña de 16 caracteres que se muestra arriba.

// Al igual que la contraseña normal, esta contraseña de aplicación ofrece acceso completo a tu cuenta de Google. No tendrás que recordarla, así que no la escribas ni la compartas con nadie.
      console.log({ user });
      const info = transporter.sendMail({
        from: user.client,
        to: "garaofran@gmail.com",
        subject: "userTitleVar",
        text: `${user.client}\nEmail: ${user.email}\nPhone: ${user.phone}\nCity: ${user.city}\nEstablishment: ${user.establishment}\nService: ${user.service}\nStart Date: ${user.startDate}\nEnd Date: ${user.endDate}\nMessage: ${user.message}`,
        html: "<b>userMSGVar</b>", //? Ver si es necesario sino a casa
      });
      console.log({ emailXD: info.text });
      console.log("termino");
    } catch (error) {
      console.log({"***ERROR***": error});
    }
  },
  deleteContact(id) {
    return Contact.destroy({ where: { id } })
      .then((contact) => {
        return contact;
      })
      .catch((error) => {
        return error;
      });
  },
};
