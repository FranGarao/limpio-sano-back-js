
module.exports = (sequelize, DataTypes) => {
    const alias = "Secret"
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        secret: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
    const config = {
        tableName: "secret",
        timestamps: false
    }
    const Secret = sequelize.define(alias, cols, config)

    return Secret
}