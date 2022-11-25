import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      requided: [true, "Username is required"],
    },
    socialName: {
      type: String,
      trim: true,
    },
    adress: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Provide a valid email"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);
