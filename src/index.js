import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
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

mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(
      PORT,
      () =>
        console.log(`Listening on port ${PORT}`) +
        console.table(listEndpoints(app))
    )
  );
