import { Router } from "express";
import uploadCloud from "../config/cloudinary.config.js";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

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
    await User.findByIdAndUpdate(newProduct.owner, {
      $push: { products: newProduct._id },
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

// ver rota que não esá funcionando!!!!!!!!!!!!!!!!!!!!!!
router.put(
  "/product/:id/image-upload",
  uploadCloud.single("image"),
  async (req, res, next) => {
    console.log(req.file);
    const { id } = req.params;

    try {
      const product = await Product.findByIdAndUpdate(
        id,
        { image: req.file.path },
        { new: true }
      );
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
