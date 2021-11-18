import express from "express";
import ProductDto from "./product-dto";
import ProductsSchema from "./schema";

const productsRoute = express.Router();

productsRoute.get("/", async (_req, res, next) => {
  try {
    const products = await ProductsSchema.find();
    const productsList = products.map((product: ProductDto) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      disponibility: product.quantity > 0 ? "available" : "out of stock",
    }));
    res.send({ products: productsList });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductsSchema.findById(req.params.id);
    const selectedProduct: ProductDto = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      disponibility: product.quantity > 0 ? true : false,
    };

    res.send({
      products: [selectedProduct],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.put("/:id", async (req, res, next) => {
  try {
    const { name, price, quantity }: ProductDto = req.body;
    const editedProduct = await ProductsSchema.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity }
    );

    res.status(202).send(editedProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.post("/", async (req, res, next) => {
  try {
    const { name, price, quantity }: ProductDto = req.body;
    const productToPost = await new ProductsSchema({
      name,
      price,
      quantity,
    }).save();

    res.status(201).send(productToPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.put("/products/:id/add-stock", async (req, res, next) => {
  try {
    const quantity: number = await req.body.quantity;
    const productToUpdate = await ProductsSchema.findById(req.params.id);
    const newQuantity: number = productToUpdate.quantity + quantity;
    const updatedProduct = await ProductsSchema.findByIdAndUpdate(
      req.params.id,
      { quantity: newQuantity }
    );

    res.status(202).send(updatedProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.put("/:id/sell", async (req, res, next) => {
  try {
    const { quantity } = await ProductsSchema.findById(req.params.id);
    const desiredQuantity: number = await req.body.quantity;
    const newQuantity: number = quantity - desiredQuantity;
    const productToPost: ProductDto = await ProductsSchema.findByIdAndUpdate(
      req.params.id,
      { quantity: newQuantity }
    );

    res.status(201).send(productToPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.delete("/all", async (_req, res, next) => {
  try {
    await ProductsSchema.deleteMany();
    res.send({ message: "All products were deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.delete("/:id", async (_req, res, next) => {
  try {
    const products = await ProductsSchema.find();
    res.send({ message: "product deleted", products: products });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default productsRoute;
