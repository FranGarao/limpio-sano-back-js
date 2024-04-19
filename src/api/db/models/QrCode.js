module.exports = (sequelize, DataTypes) => {
  const alias = "QrCode";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  };
  const config = {
    tableName: "qr_codes",
    timestamps: false,
  };
  const QrCode = sequelize.define(alias, cols, config);

  QrCode.associate = (models) => {
    QrCode.belongsTo(models.User, {
      as: "users",
      foreignKey: "user_id",
    });
  };

  return QrCode;
};
