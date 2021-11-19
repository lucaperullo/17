import express from "express";
import { check, oneOf, validationResult } from "express-validator";
import _ from "lodash";
import {
  checkAll,
  checkId,
  checkName,
  checkPrice,
  checkQuantity,
} from "../../middlewares/expressValidators";

import ProductDto from "./product-dto";
import ProductsSchema from "./schema";

const productsRoute = express.Router();

productsRoute.post("/", checkAll, async (req, res, next) => {
  try {
    const { name, price, quantity }: ProductDto = req.body;
    const productToPost = await new ProductsSchema({
      name,
      price,
      quantity,
    }).save();

    res.status(201).send({
      message: "Product created successfully 🔵🟠🟡",
      product: _.pick(productToPost, [
        "id",
        "name",
        "price",
        "quantity",
      ]) as ProductDto,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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
    const message = () => {
      if (productsList.length === 0) {
        return "No products found ⭕";
      }
      return "A list of the procts were found 🔵";
    };
    const prods = _.orderBy(productsList, ["name"], ["asc"]);
    res.send({ message: message(), products: prods });
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
      message: "Product found 🔵",
      product: [selectedProduct],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.put(
  "/:id",
  checkQuantity,
  checkPrice,
  checkId,
  async (req, res, next) => {
    try {
      await ProductsSchema.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity,
        },
      });

      res.send({
        message: "Product updated successfully 🟢",
        product: _.pick(req.body, ["name", "price", "quantity"]) as ProductDto,
        // product: {
        //   id: req.body._id,
        //   name: req.body.name,
        //   price: req.body.price,
        //   quantity: parseInt(req.body.quantity),
        //   disponibility: parseInt(req.body.quantity) > 0 ? true : false,
        // },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

productsRoute.put(
  "/:id/add-stock",

  check("quantity", "The minimum quantity value must be at least of 10.")
    .isLength({ min: 2 })
    .isInt({
      min: 10,
    }),
  async (req, res, next) => {
    try {
      if (validationResult(req.body).isEmpty()) {
        const { quantity } = req.body;
        const productToUpdate = await ProductsSchema.findByIdAndUpdate(
          req.params.id,
          { $inc: { quantity } }
        );
        const updatedProduct = {
          _id: productToUpdate._id,
          name: productToUpdate.name,
          price: productToUpdate.price,
          quantity:
            parseInt(productToUpdate.quantity.toString()) + parseInt(quantity),
        };
        res.status(202).send({
          message: "Product updated successfully 🟢",
          product: _.pick(updatedProduct, [
            "id",
            "name",
            "price",
            "quantity",
          ]) as ProductDto,
        });
      } else {
        res.status(400).send(validationResult(req).array());
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

productsRoute.put(
  "/:id/sell",
  check(["quantity"]).exists(),
  async (req, res, next) => {
    try {
      if (validationResult(req).isEmpty()) {
        const { quantity } = req.body;
        const productToUpdate = await ProductsSchema.findByIdAndUpdate(
          req.params.id,
          { $inc: { quantity: -quantity } }
        );
        const updatedProduct = {
          _id: productToUpdate._id,
          name: productToUpdate.name,
          price: productToUpdate.price,
          quantity:
            parseInt(productToUpdate.quantity.toString()) - parseInt(quantity),
        };
        res.status(202).send({
          message: "Product updated successfully 🟢",
          product: _.pick(updatedProduct, [
            "id",
            "name",
            "price",
            "quantity",
          ]) as ProductDto,
        });
      } else {
        res.status(400).send(validationResult(req).array());
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

productsRoute.delete("/all", async (_req, res, next) => {
  try {
    await ProductsSchema.deleteMany();
    res.send({ message: "All products were deleted from your database 🔴" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRoute.delete("/:id", async (req, res, next) => {
  try {
    const product = await ProductsSchema.findByIdAndDelete(req.params.id);
    const products = await ProductsSchema.find();
    if (product) {
      res.send({
        message: "Product deleted successfully from your database 🔴",
        products: products,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default productsRoute;
