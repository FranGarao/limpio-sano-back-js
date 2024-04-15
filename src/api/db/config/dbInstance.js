// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("limpio_sano", "root", "26deoctubrE26", {
//   host: process.env.DB_HOST || "localhost",
//   //   port: 6666,
//   dialect: process.env.DB_TYPE || "mysql",
// });
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// testConnection();

// // export const models = {
// //   Category: initializeCategory(sequelize),
// //   Service: initializeService(sequelize),
// //   User: initializeUser(sequelize),
// // };

// // // Establecer las relaciones
// // models.Category.hasMany(models.Service, {
// //   sourceKey: "id",
// //   foreignKey: "category_id",
// //   as: "services", // alias para la relación
// // });

// // models.Service.belongsTo(models.Category, {
// //   targetKey: "id",
// //   foreignKey: "category_id",
// //   as: "category", // alias para la relación
// // });

// exports.sequelize = sequelize;
