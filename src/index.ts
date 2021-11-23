import express from "express";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import {
  badRequestErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./middlewares/errorHandler";
import productsRoute from "./routes/product";
import auth from "./routes/authentication";
import verifyToken from "./middlewares/authValidation";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/products", verifyToken, productsRoute);
app.use("/user", auth);
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
