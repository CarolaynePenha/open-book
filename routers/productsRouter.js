import { Router } from "express";
import { productSchema } from "../middlewares/validateSchema.js";
import {
  getProduct,
  getProducts,
  getSearchProducts,
  registerProducts,
} from "../controllers/productsController.js";
import { getCategory } from "../controllers/categoryCrontrollers.js";

const productsRouter = Router();

productsRouter.post("/products", productSchema, registerProducts);

productsRouter.get("/products", getCategory, getProducts);

productsRouter.get("/products/:id", getProduct);

productsRouter.get("/productsSrc", getSearchProducts);

export default productsRouter;
