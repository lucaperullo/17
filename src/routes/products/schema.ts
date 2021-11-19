import mongoose from "mongoose";
import ProductDto from "./product-dto";

const ProductSchema = new mongoose.Schema<ProductDto>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      max: 5000,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Product", ProductSchema);
