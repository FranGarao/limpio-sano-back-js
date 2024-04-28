const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
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
const faqsRoutes = require("./api/routes/faqs.routes");
const contactRoutes = require("./api/routes/contact.routes");
const sliderRoutes = require("./api/routes/slider.routes");

//configuro la zona horaria a bs as
const moment = require("moment-timezone");
moment.tz.setDefault("America/Argentina/Buenos_Aires");

app.use(express.json());
app.use(
  session({
    secret: "pluto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
/** Rutas */
app.use(`${API}/users`, usersRoutes);
app.use(`${API}/services`, serviceRoutes);
app.use(`${API}/categories`, categoriesRoutes);
app.use(`${API}/faqs`, faqsRoutes);
app.use(`${API}/contacts`, contactRoutes);
app.use(`${API}/slider`, sliderRoutes);

app.get(`${API}/`, (_, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://${PORT}${API}/`);
});
