import { Router } from "express";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

const router = Router();

router.get("/user/products", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("products");
    res.status(200).json(user.products);
  } catch (error) {
    next(error);
  }
});

export default router;
