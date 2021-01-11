const router = require('express').Router()
const Review = require('../models/review')
const Product = require('../models/product')
const verifyToken = require("../middlewares/verify-token");

router.post('/:productID', verifyToken, async (req, res)=>{
    try {
        const review = new Review()
        review.headline = req.body.headline
        review.body = req.body.body
        review.rating = req.body.rating
        review.photo = req.body.photo
        review.user = req.decoded._id
        review.productID = req.params.productID

        await product.u
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})