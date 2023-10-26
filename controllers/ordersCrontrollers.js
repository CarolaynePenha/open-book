import dayjs from "dayjs";

import db from "../db.js";

export async function postOrders(req, res) {
  const order = req.body;

  const session = res.locals.session;
  try {
    await db.collection("orders").insertOne({
      ...order,
      date: dayjs().format("DD/MM/YYYY"),
      userId: session.userId,
    });
    res.status(201).send("Pedido salvo com sucesso");
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function getOrders(req, res) {
  const session = res.locals.session;
  const page = parseInt(req.query.page);
  const limit = 5;
  try {
    const orders = await db
      .collection("orders")
      .find({ userId: session.userId })
      .skip(page * limit)
      .limit(limit)
      .toArray();
    res.send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
