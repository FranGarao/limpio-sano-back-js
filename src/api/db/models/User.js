module.exports = (sequelize, DataTypes) => {
  const alias = "User";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  const config = {
    tableName: "users",
    timestamps: false,
  };
  const User = sequelize.define(alias, cols, config);

  User.associate = (models) => {
    User.hasMany(models.QrCode, {
      as: "qr_codes",
      foreignKey: "user_id",
    });
  };

  return User;
};
