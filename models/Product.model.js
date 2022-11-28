import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      trim: true,
      requided: [true, "Product Name is required"],
    },
    image: String,
    price: Number,
    description: { type: String, maxLength: 500 },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

export default model ('Product', productSchema)
