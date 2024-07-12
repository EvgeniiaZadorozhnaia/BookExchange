require("dotenv").config();
const cors = require("cors");
const apiRouter = require("./routers/api.router");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { removeHeader } = require('./middlewares/common');
const path = require("path");

const express = require("express");

const app = express();
const { PORT } = process.env;

const corsConfig = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors(corsConfig));
app.use(removeHeader);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/v1", apiRouter);

app.use("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
