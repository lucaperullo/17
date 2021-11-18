import express from "express";
import ProductDto from "./product-dto";
import ProductsSchema from "./schema";

const productsRoute = express.Router();

productsRoute.get("/", async (req, res, next) => {
  try {
    const products = await ProductsSchema.find();
    const productsList = products.map((product: ProductDto) => ({
      id: product.id,
      product: product.name,
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
    const selectedProduct = {
      id: product._id,
      product: product.name,
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
    const { product, price, quantity } = req.body;
    const editedProduct = await ProductsSchema.findByIdAndUpdate(
      req.params.id,
      { product, price, quantity }
    );

    res.status(202).send(editedProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.post("/", async (req, res, next) => {
  try {
    const { product, price, quantity } = req.body;
    const productToPost = await new ProductsSchema({
      product,
      price,
      quantity,
    }).save();

    res.status(201).send(productToPost);
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
