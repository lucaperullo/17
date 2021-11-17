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
    res.status(202).send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.post("/", async (req, res, next) => {
  try {
    const product = await ProductsSchema.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.delete("/:id", async (req, res, next) => {
  try {
    const product = await ProductsSchema.findByIdAndDelete(req.params.id);

    const products = await ProductsSchema.find();
    res.send({ message: "product deleted", products: products });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default productsRoute;
