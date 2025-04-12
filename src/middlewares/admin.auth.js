export const adminAuth = (req, res, next) => {
  // Verifique se o token foi fornecido
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  // Extraia o token e verifique
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;

    // Aqui você pode fazer uma verificação adicional para garantir que o usuário tenha o papel de "admin"
    // Supondo que o campo "role" esteja presente no token (você deve definir isso ao gerar o token)
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({
          error:
            "Acesso negado. Apenas administradores podem acessar esta rota.",
        });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
