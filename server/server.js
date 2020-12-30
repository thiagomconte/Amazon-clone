const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

//! Configuração de middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//! Conexao com banco de dados
require("./dataBase/mongodbconnection");

//! Routes
app.use("/user", require("./router/userRoute"));
app.use("/product", require("./router/productRoute"));
app.use("/category", require("./router/categoryRoute"));
app.use("/owner", require("./router/ownerRoute"));

app.post("/", (req, res) => {
  var { name } = req.body;
  res.status(200).json(name);
});

app.get("/", (req, res) => {
  res.json("Hello amazon");
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on PORT ${PORT}`);
  }
});
