module.exports = (sequelize, DataTypes) => {
  const alias = "Category";
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
  };
  const config = {
    tableName: "categories",
    timestamps: false,
  };
  const Category = sequelize.define(alias, cols, config);

  Category.associate = (models) => {
    Category.hasMany(models.Service, {
      as: "services",
      foreignKey: "category_id",
    });
  };

  return Category;
};
