import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const { name, socialName, address, email, password } = req.body;
  try {
    if (!name || !address || !email || !password) {
      const error = new Error("name, address, email and password are required");
      error.status = 400;
      throw error;
    }

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    if (!regex.test(password)) {
      const error = new Error(
        "Password must have at least 1 uppercase letter, 1 lowercase, 1 number and 6 characters"
      );
      error.status = 400;
      throw error;
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const userFromDb = await User.create({
      name,
      socialName,
      address,
      email,
      passwordHash,
    });

    res
      .status(201)
      .json({ name, socialName, address, email, id: userFromDb.id });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      error.status = 400;
      next(error);
    }
    if (error.code === 11000) {
      error.message = "email already exists";
      error.status = 400;
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      const error = new Error("Password and email are required");
      error.status = 400;
      throw error;
    }

    const userFromDb = await User.findOne({ email });

    if (!userFromDb) {
      const error = new Error("User not found");
      error.status = 401;
      throw error;
    }

    const verify = bcrypt.compareSync(password, userFromDb.passwordHash);

    if (!verify) {
      const error = new Error("Invalid Password");
      error.status = 401;
      throw error;
    }

    const payload = {
      id: userFromDb.id,
      name: userFromDb.name,
      email: userFromDb.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.status(200).json({ name: userFromDb.name, token });
  } catch (error) {
    next(error);
  }
});

export default router;
