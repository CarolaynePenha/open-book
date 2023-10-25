import { ObjectId } from "mongodb";

import db from "../db.js";

export async function postTrolleyItems(req, res) {
  const { id } = req.params;
  const body = req.body;
  console.log("body: ", body);
  console.log("id: ", id);
  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    const session = res.locals.session;
    await db.collection("trolley").insertOne({
      title: product.title,
      image: product.image,
      price: product.price,
      seller: product.seller,
      userID: session.userId,
      quantity: body.quantity,
      total: body.quantity * product.price,
    });

    const trolley = await db
      .collection("trolley")
      .find({ userID: session.userId })
      .toArray();
    const trolleyLength = trolley.length;

    res.status(201).send({ trolleyLength: trolleyLength });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function deleteTrolleyItem(req, res) {
  const { id } = req.params;
  const session = res.locals.session;
  try {
    await db
      .collection("trolley")
      .deleteOne({ _id: new ObjectId(id), userID: session.userId });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function deleteTrolleyItems(req, res) {
  const session = res.locals.session;

  try {
    await db.collection("trolley").deleteMany({ userID: session.userId });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function getTrolleyItems(req, res) {
  const session = res.locals.session;
  try {
    const products = await db
      .collection("trolley")
      .find({ userID: session.userId })
      .toArray();

    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
