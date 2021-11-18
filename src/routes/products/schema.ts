import mongoose from "mongoose";

export interface Product {
  _id: any;
  product: string;
  price: number;
  quantity: number;
}

const ProductSchema = new mongoose.Schema<Product>(
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
  },
  { versionKey: false }
);

export default mongoose.model("Product", ProductSchema);
