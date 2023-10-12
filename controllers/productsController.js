import dotenv from "dotenv";

import db from "../db.js";

dotenv.config();

export async function registerProducts(req, res) {
  const { authorization } = req.headers;

  //  image,title,price,seller,description, category
  const products = req.body;

  const password = authorization?.replace("Bearer ", "").trim();
  console.log("password: ", password);

  if (!password) return res.status(401).send("Acesso negado");
  if (password === process.env.PASSWORD_BACK_PRODUCTS) {
    try {
      await db.collection("products").insertOne(products);
      res.status(201).send("Produto cadastrado");
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Algo deu errado, tente novamente",
        err: err.response,
      });
    }
  } else {
    res.status(401).send("Acesso negado");
  }
}

export async function getProducts(req, res) {
  try {
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
