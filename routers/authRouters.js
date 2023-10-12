import { Router } from "express";

import { signIn, signUp } from "../controllers/authControllers.js";
import { signInSchema, singUpSchema } from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/signIn", signInSchema, signIn);

authRouter.post("/signUp", singUpSchema, signUp);

export default authRouter;
