module.exports = (sequelize, DataTypes) => {
    const alias = "Faq";
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    };
    const config = {
      tableName: "faqs",
      timestamps: false,
    };
    const Faq = sequelize.define(alias, cols, config);
  
    // Faq.associate = (models) => {
    //   Faq.belongsTo(models.Service, {
    //     as: "service",
    //     foreignKey: "service_id",
    //   });
    // };
  
    return Faq;
}