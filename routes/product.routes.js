import { Router } from "express";
import Product from "../models/Product.model.js";


const router = Router()

router.post('/product', async (req, res, next) => {
    const {productName, image, price, description } = req.body

    try{
        const newProduct = await Product.create({
            productName,
            image,
            price,
            description,
            owner: req.user.id,
        })
        res.status(200).json(newProduct)
    } catch (error) {
        next(error)
    }
} )

router.get('/product', async (req, res, next) => {
    try{
        const userId = req.user.id
        const allProduct = await Product.find({user: userId});
        res.status(200).json(allProduct)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});


export default router