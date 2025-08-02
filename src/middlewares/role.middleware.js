export const checkRole = (requiredRole) => (req, res, next) => {
  // Se não houver dados do usuário (token inválido) ou o papel for diferente do necessário
  if (!req.user || req.user.role !== requiredRole) {
    return res.status(403).json({
      error: `Acesso negado. Apenas usuários com a role '${requiredRole}' podem acessar esta rota.`,
    });
  }
  next();
};
