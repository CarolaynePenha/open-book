import db from "../db.js";
export default async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "").trim();

  if (!token) return res.sendStatus(401);
  try {
    const session = await db.collection("session").findOne({ token });
    res.locals.session = session;
    if (!session) {
      res.sendStatus(401);
      return;
    }
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
