import express from "express";
import ProductsSchema from "./schema";

const productsRoute = express.Router();

productsRoute.get("/", async (req, res, next) => {
  try {
    const products = await ProductsSchema.find();
    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.put("/:id", async (req, res, next) => {
  try {
    const product = await ProductsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.post("/", async (req, res, next) => {
  try {
    const product = await ProductsSchema.create(req.body);
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.delete("/:id", async (req, res, next) => {
  try {
    const product = await ProductsSchema.findByIdAndDelete(req.params.id);
    res.send("product " + req.params.id + " deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default productsRoute;
