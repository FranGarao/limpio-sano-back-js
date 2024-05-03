module.exports = (sequelize, DataTypes) => {
  const alias = "Contact";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const config = {
    tableName: "contact_info",
    timestamps: false,
  };
  const Contact = sequelize.define(alias, cols, config);

  return Contact;
};
