import { ObjectId } from "mongodb";

import db from "../db.js";

export async function postTrolleyItens(req, res) {
  const { id } = req.params;
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
      userID: session.userId,
    });
    res.status(201).send("Produto adicionado ao carinho");
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function deleteTrolleyItens(req, res) {
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

export async function getTrolleyItens(req, res) {
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
