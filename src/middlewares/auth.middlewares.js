import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const verifyTokenUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
