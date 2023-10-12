import db from "../db.js";
import { ObjectId } from "mongodb";

export async function validID(req, res, next) {
  const { id } = req.params;
  const validID = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });
  if (!validID) {
    res.sendStatus(404);
    return;
  }
  next();
}

export async function validIdTrolley(req, res, next) {
  const { id } = req.params;
  const validID = await db
    .collection("trolley")
    .findOne({ _id: new ObjectId(id) });
  if (!validID) {
    res.sendStatus(404);
    return;
  }
  next();
}
