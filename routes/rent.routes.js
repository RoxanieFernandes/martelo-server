import { Router } from "express";
// import Product from "../models/Product.model.js";
import User from "../models/User.model.js";
import Rent from "../models/Rent.model.js";

const router = Router();

router.post("/rent", async (req, res, next) => {
  const { inicialDate, deliveryDate, price } = req.body;

  try {
    const newRent = await Rent.create({
      owner: req.user.id,
      renter: req.user.id,
      product: req.product.id,
      inicialDate,
      deliveryDate,
      price,
    });
    await User.findByIdAndUpdate(newRent.owner.renter, {
      $push: { products: newRent._id },
    });
    res.status(200).json(newRent);
  } catch (error) {
    next(error);
  }
});

export default router;
