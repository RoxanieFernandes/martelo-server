import { Router } from "express";
import Product from "../models/Product.model.js";
import Rent from "../models/Rent.model.js";

const router = Router();

router.post("/rent/:id", async (req, res, next) => {
  const { inicialDate, deliveryDate, price } = req.body;
  const { id } = req.params;
  console.log(req.user);
  try {
    const product = await Product.findById(id);
    const { owner } = product;
    if (owner == req.user.id) {
      return res.status(400).json("You cannot rent your own product");
    }
    const rents = await Rent.find({ product: id });
    const notAvaiable = rents.some((rent) => {
      return (
        (new Date (inicialDate) >= rent.inicialDate && new Date (inicialDate) <= rent.deliveryDate) ||
        (deliveryDate >= rent.inicialDate && deliveryDate <= rent.deliveryDate)
      );
    });
    if (notAvaiable) {
      return res.status(400).json("product not avaiable");
    }
    const newRent = await Rent.create({
      owner,
      renter: req.user.id,
      product: id,
      inicialDate,
      deliveryDate,
      price,
    });
    res.status(200).json(newRent);
  } catch (error) {
    next(error);
  }
});

export default router;
