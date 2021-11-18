import express from "express";
import { check, oneOf, validationResult } from "express-validator";
import _ from "lodash";
import pick from "lodash/pick";
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

productsRoute.put(
  "/:id",
  oneOf([
    [check("name").exists(), check("quantity").exists()],
    check("price").exists(),
  ]),
  async (req, res, next) => {
    try {
      if (validationResult(req).isEmpty()) {
        const product = await ProductsSchema.findByIdAndUpdate(req.params.id, {
          $set: {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
          },
        });

        res.send({
          message: "Product updated successfully",
          product: _.pick(req.body, [
            "name",
            "price",
            "quantity",
          ]) as ProductDto,
          // product: {
          //   id: req.body._id,
          //   name: req.body.name,
          //   price: req.body.price,
          //   quantity: parseInt(req.body.quantity),
          //   disponibility: parseInt(req.body.quantity) > 0 ? true : false,
          // },
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

productsRoute.post(
  "/",
  oneOf([
    [check("name").exists(), check("quantity").exists()],
    check("price").exists(),
  ]),
  async (req, res, next) => {
    try {
      if (validationResult(req).isEmpty()) {
        const { name, price, quantity }: ProductDto = req.body;
        const productToPost = await new ProductsSchema({
          name,
          price,
          quantity,
        }).save();

        res.status(201).send(productToPost);
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
  "/:id/add-stock",

  check("quantity", "quantity must be at least of 10").isLength({ min: 2 }),

  async (req, res, next) => {
    try {
      if (validationResult(req).isEmpty()) {
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
        res.status(202).send(updatedProduct);
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
  check("quantity").exists(),
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
        res.status(202).send(updatedProduct);
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
