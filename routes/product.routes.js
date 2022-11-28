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
export default router