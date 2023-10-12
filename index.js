import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routers/authRouters.js";
import productsRouter from "./routers/productsRouter.js";
import trolleyRouter from "./routers/trolleyRouters.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(authRouter);
app.use(productsRouter);
app.use(trolleyRouter);
app.use(orderRouter);

app.listen(process.env.ACESS_PORT);
