require("dotenv").config();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");

// const PORT = process.env.PORT || 8000;

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: `*`,
  })
);

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
