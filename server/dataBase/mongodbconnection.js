const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => console.log("Database connection failed: " + err));

module.exports = { mongoose };
