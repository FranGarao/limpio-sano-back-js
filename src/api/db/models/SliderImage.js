module.exports = (sequelize, DataTypes) => {
  const alias = "SliderImage";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const config = {
    tableName: "slider_images",
    timestamps: false,
  };
  const SliderImage = sequelize.define(alias, cols, config);
  return SliderImage;
};
