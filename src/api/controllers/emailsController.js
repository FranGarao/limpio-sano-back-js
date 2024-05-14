const nodemailer = require("nodemailer");

module.exports = {
  transporter: nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "miEmail",
      pass: "mipassword",
    },
  }),

  main: async (req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
    }
      const info = await this.transporter.sendMail({
        from: "usuarioVar",
        to: "limpiosano@gmail.com, limpito@gmial./com",
        subject: "userTitleVar",
        text: "userMSGVar",
        html: "<b>userMSGVar</b>", //? Ver si es necesario sino a casa
      });

      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};
