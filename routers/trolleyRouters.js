import { Router } from "express";

import tokenValidation from "../middlewares/tokenValidation.js";
import {
  deleteTrolleyItem,
  deleteTrolleyItems,
  getTrolleyItems,
  postTrolleyItems,
  putTrolleyItem,
} from "../controllers/trolleyControllers.js";
import { validID, validIdTrolley } from "../middlewares/ValidID.js";

const trolleyRouter = Router();

trolleyRouter.post("/trolley/:id", tokenValidation, validID, postTrolleyItems);

trolleyRouter.put(
  "/trolley/:id",
  tokenValidation,
  validIdTrolley,
  putTrolleyItem
);

trolleyRouter.get("/trolley", tokenValidation, getTrolleyItems);

trolleyRouter.delete(
  "/trolley/:id",
  tokenValidation,
  validIdTrolley,
  deleteTrolleyItem
);
trolleyRouter.delete("/trolley", tokenValidation, deleteTrolleyItems);

export default trolleyRouter;
