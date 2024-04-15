const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const PORT = process.env.PORT || 3001;
const API = process.env.API || "/api";

//Debug
// const debug = require("debug")("express-app");
// app.get(`/debug`, (_, res) => {
//   debug("Debugging");
//   res.send("Debugging");
// });

/** Import routes */
const usersRoutes = require("./api/routes/users.routes");
const serviceRoutes = require("./api/routes/services.routes");
const categoriesRoutes = require("./api/routes/categories.routes");

app.use(express.json());
app.use(cors());
/** Rutas */
app.use(`${API}/users`, usersRoutes);
app.use(`${API}/services`, serviceRoutes);
app.use(`${API}/categories`, categoriesRoutes);

app.get(`${API}/`, (_, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://${PORT}${API}/`);
});
