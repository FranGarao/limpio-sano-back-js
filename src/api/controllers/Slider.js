const { get } = require("http");
const { SliderImage } = require("../db/models");
const { raw } = require("mysql2");

module.exports = {
  getSliderImages: async (_, res) => {
    try {
      const images = await SliderImage.findAll({ raw: true });
      console.log(images);
      res.json({ ok: true, status: 200, images });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
