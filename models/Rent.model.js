import { Schema, model } from "mongoose";

const rentSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    inicialDate: {
      type: Date,
      required: [true, "Date is required"],
    },
    deliveryDate: {
      type: Date,
      required: [true, "Date is required"],
    },
    price: Number,
  },
  { timestamps: true }
);

export default model ('Rent', rentSchema)