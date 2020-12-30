const router = require("express").Router();
const Product = require("../models/product");

//! Create a new product
router.post("/add", async (req, res) => {
  try {
    let { title, description, photo, stockQuantity } = req.body;
    let product = new Product();

    product.title = title;
    product.description = description;
    product.photo = photo;
    product.stockQuantity = stockQuantity;

    await product.save();
    res.json({ success: true, message: "Successfully saved" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//! Get all products

//! Get a single product

//! Update a single product

//! Delete a single product

module.exports = router;
