import { Router } from "express";

import { getOrders, postOrders } from "../controllers/ordersCrontrollers.js";
import { orderSchema } from "../middlewares/validateSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const orderRouter = Router();

orderRouter.post("/order", tokenValidation, orderSchema, postOrders);

orderRouter.get("/order", tokenValidation, getOrders);

export default orderRouter;
