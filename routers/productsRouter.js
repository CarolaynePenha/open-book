import { Router } from "express";
import { productSchema } from "../middlewares/validateSchema.js";
import {
  getProducts,
  registerProducts,
} from "../controllers/productsController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import { getCategory } from "../controllers/categoryCrontrollers.js";

const productsRouter = Router();

productsRouter.post("/products", productSchema, registerProducts);

productsRouter.get("/products", tokenValidation, getCategory, getProducts);

export default productsRouter;
