import db from "../db.js";

export async function getCategory(req, res, next) {
  const queryCategory = req.query.category;

  try {
    if (queryCategory) {
      const category = await db
        .collection("products")
        .find({ category: queryCategory })
        .toArray();
      res.send(category);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
