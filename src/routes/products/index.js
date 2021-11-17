import express from "express";
import ProductsSchema from "./schema";

const productsRoute = express.Router();

productsRoute.get("/", async (req, res, next) => {
  try {
    const products = await ProductsSchema.find();
    res.send({
      products: products.map((product) =>
        product.quantity > 0 ? product : product
      ),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductsSchema.findById(req.params.id);
    product.disponibility = product.quantity > 0 ? "available" : "unavailable";
    res.send({
      products: [product],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.put("/:id", async (req, res, next) => {
  try {
    const product = await ProductsSchema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    // product.disponibility = req.body.quantity > 0 ? true : false;
    // product.save();
    res.status(202).send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.post("/", async (req, res, next) => {
  try {
    const product = await new ProductsSchema({
      ...req.body,
      disponibility: req.body.quantity > 0 ? true : false,
    }).save();

    res.status(201).send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.delete("/all", async (req, res, next) => {
  try {
    await ProductsSchema.deleteMany();
    res.send({ message: "All products were deleted" });
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
