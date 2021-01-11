const router = require("express").Router();
const User = require("../models/user");
const { newUserValidator } = require("../validator/newUserVal");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify-token");

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
        res
          .status(400)
          .json({ success: false, message: "E-mail already exists" });
      } else {
        res.status(500).json({ success: false, message: "Try again later" });
      }
    } else {
      let token = jwt.sign(user.toJSON(), process.env.SECRET, {
        expiresIn: 604800, //1 week
      });
      res.json({
        success: true,
        token: token,
        message: "Successfully created",
      });
    }
  });
});

//! PROFILE ROUTER
router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.decoded._id });
    if (user) {
      res.json({
        success: true,
        user: user,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//!LOGIN ROUTE
router.post("/auth/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        success: false,
        message: "Authentication failed, user no found",
      });
    } else {
      if (user.comparePassword(req.body.password)) {
        let token = jwt.sign(user.toJSON(), process.env.SECRET, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: token,
        });
      } else {
        res
          .status(403)
          .json({
            success: false,
            message: "Authentication failed, wrong password",
          });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//!UPDATE PROFILE
router.put('/auth/user', verifyToken, async (req, res) => {
    try {
      let user = await User.findOne({_id: req.decoded._id})
      if(user){
        if(req.body.name) user.name = req.body.name;
        if(req.body.email) user.email = req.body.email;
        if(req.body.password) user.password = req.body.password;


        await user.save()

        res.json({
          success: true,
          message: "Successfully updated"
        })
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
})

module.exports = router;
