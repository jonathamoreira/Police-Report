import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminAuth = (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Erro interno do servidor." });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  // Extraímos o token do header
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    // Verificando se o usuário tem o papel de "admin"
    if (decoded.role !== "admin") {
      return res.status(403).json({
        error: "Acesso negado. Apenas administradores podem acessar esta rota.",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
