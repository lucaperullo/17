import mongoose from "mongoose";
import ProductDto from "../routes/product/product-dto";

const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema<ProductDto>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Product", ProductSchema);
