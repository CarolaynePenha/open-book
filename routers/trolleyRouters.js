import { Router } from "express";

import tokenValidation from "../middlewares/tokenValidation.js";
import {
  deleteTrolleyItens,
  getTrolleyItens,
  postTrolleyItens,
} from "../controllers/trolleyControllers.js";
import { validID, validIdTrolley } from "../middlewares/ValidID.js";

const trolleyRouter = Router();

trolleyRouter.post("/trolley/:id", tokenValidation, validID, postTrolleyItens);

trolleyRouter.get("/trolley", tokenValidation, getTrolleyItens);

trolleyRouter.delete(
  "/trolley/:id",
  tokenValidation,
  validIdTrolley,
  deleteTrolleyItens
);

export default trolleyRouter;
