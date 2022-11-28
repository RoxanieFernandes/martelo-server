import { Router } from "express";
import Product from "../models/Product.model.js";

const router = Router();

router.post("/product", async (req, res, next) => {
  const { productName, image, price, description } = req.body;

  try {
    const newProduct = await Product.create({
      productName,
      image,
      price,
      description,
      owner: req.user.id,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/product", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allProduct = await Product.find({ user: userId });
    res.status(200).json(allProduct);
  } catch (error) {
    next(error);
  }
});

router.put("/product/:id", async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { productName, image, price, description } = req.body;
  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/product/:id", async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const product = await Product.findById(id);
    product.delete();
    res.status(202).json("Product was deleted");
  } catch (error) {
    next(error);
  }
});

export default router;
