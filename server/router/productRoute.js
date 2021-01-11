const router = require("express").Router();
const Product = require("../models/product");
const Owner = require("../models/owner")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//! Create a new product
router.post("/add", async (req, res) => {
    try {
        let {
            title,
            description,
            photo,
            price,
            stockQuantity,
            ownerID,
            categoryID,
        } = req.body;
        let product = new Product();

        product.category = categoryID;
        product.owner = ownerID;
        product.title = title;
        product.description = description;
        //product.photo = req.file.path;
        product.photo = photo;
        product.price = price;
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
router.get("/getall", async (req, res) => {
    try {
        let products = await Product.find().populate('owner category').exec();
        res.json({
            success: true,
            products: products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

//! Get a single product
router.get("/getone/:id", async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).populate('owner category').exec();
        res.json({
            success: true,
            product: product,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

//! Update a single product
router.put("/update/:id", async (req, res) => {
    try {
        let {
            title,
            description,
            photo,
            stockQuantity,
            categoryid,
            price,
            ownerid,
        } = req.body;
        let product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: title,
                    description: description,
                    photo: photo,
                    stockQuantity: stockQuantity,
                    category: categoryid,
                    owner: ownerid,
                    price: price
                },
            },
            { upsert: true }
        );
        res.json({ success: true, updatedProduct: product });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

//! Delete a single product
router.delete("/deleteone/:id", async (req, res) => {
    try {
        let deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.json({ success: true, message: "Successfully deleted" });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;
