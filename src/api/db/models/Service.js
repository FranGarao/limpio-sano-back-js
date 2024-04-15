module.exports = (sequelize, DataTypes) => {
  const alias = "Service";
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  };
  const config = {
    tableName: "services",
    timestamps: false,
  };
  const Service = sequelize.define(alias, cols, config);

  Service.associate = (models) => {
    Service.belongsTo(models.Category, {
      as: "category",
      foreignKey: "category_id",
    });
  };

  return Service;
};
