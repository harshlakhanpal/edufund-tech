const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes");

const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();

app.use(cors(), bodyParser.json());

app.use("/", routes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log("Server Running"));
