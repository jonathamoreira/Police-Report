export const checkRole = (requiredRole) => (req, res, next) => {
  if (req.user.role === "super_admin" || req.user.role === requiredRole) {
    next();
  } else {
    return res.status(403).json({
      error: `Acesso negado. Apenas usuários com a role '${requiredRole}' podem acessar esta rota.`,
    });
  }
};
