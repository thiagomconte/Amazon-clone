const router = require("express").Router();
const User = require("../models/user");
const { newUserValidator } = require("../validator/newUserVal");

//! POST REQUEST
router.post("/", newUserValidator, async (req, res) => {
  let { name, email, password } = req.body;
  let user = new User();
  user.name = name;
  user.email = email;
  user.password = password;

  await user.save((err) => {
    if (err) {
      var string = JSON.stringify(err);
      var obj = JSON.parse(string);
      if (obj.keyPattern.email) {
        res.status(400).json("E-mail already exists");
      } else {
        res.status(500).json("Try again later");
      }
    } else {
      res.status(201).json("Successfully saved");
    }
  });
});

module.exports = router;
