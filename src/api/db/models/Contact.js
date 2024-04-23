module.exports = (sequelize, DataTypes) => {
    const alias = "Contact";
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      info: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    };
    const config = {
      tableName: "contacts",
      timestamps: false,
    };
    const Contact = sequelize.define(alias, cols, config);
  
  
    return Contact;
}