import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    disponibility: {
      type: Boolean,
      required: false,
      select: false,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Product", ProductSchema);
