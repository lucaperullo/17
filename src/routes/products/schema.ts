import mongoose from "mongoose";
import ProductDto from "./product-dto";

const ProductSchema = new mongoose.Schema<ProductDto>(
  {
    name: {
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
  },
  { versionKey: false }
);

export default mongoose.model("Product", ProductSchema);
