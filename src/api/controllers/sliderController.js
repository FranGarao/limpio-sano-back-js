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
  createSliderImage: async (req, res) => {
    try {
      const { url } = req.body;
      const newImage = await SliderImage.create({ url });
      res.json({ ok: true, status: 200, newImage });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  updateSliderImage: async (req, res) => {
    try {
      const { url } = req.body;
      const { id } = req.params;
      const updatedImage = await SliderImage.update({ url }, { where: { id } });
      res.json({ ok: true, status: 200, updatedImage });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  deleteSliderImage: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedImage = await SliderImage.destroy({ where: { id } });
      res.json({ ok: true, status: 200, deletedImage });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
