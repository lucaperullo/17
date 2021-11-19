import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import {
  badRequestErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./middlewares/errorHandler";
import productsRoute from "./routes/products";

const app = express();

app.use(express.json());
app.use("/products", productsRoute);
app.use(badRequestErrorHandler);
app.use(forbiddenErrorHandler);
app.use(unauthorizedErrorHandler);
app.use(notFoundErrorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.table(listEndpoints(app));
    });
  } catch (e) {
    console.log(e);
  }
}

start();
