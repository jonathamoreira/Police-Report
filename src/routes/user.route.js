import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { verifyTokenUser } from "../middlewares/auth.middlewares.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// Registro de novo usuário
router.post("/register", userController.create);

// Verificação de e-mail
router.get("/verify-email", userController.verifyEmail);

// Login do usuário
router.post("/login", userController.login);

// admin vê todos os usuários
router.get(
  "/users",
  verifyTokenUser,
  checkRole("admin"),
  userController.findAllUsers
);

// Perfil do usuário autenticado
router.get("/profile", verifyTokenUser, userController.getProfile);

// contar usuários (apenas para admins)
router.get(
  "/users/count",
  verifyTokenUser,
  checkRole("admin"),
  userController.countUsers
);

// Ver um usuário especifico
router.get(
  "/users/:id",
  verifyTokenUser,
  checkRole("admin"),
  userController.findById
);

// Excluir um usuário (apenas para admins)
router.delete(
  "/users/:id",
  verifyTokenUser,
  checkRole("admin"),
  userController.deleteUser
);

// Atualizar um usuário (apenas para admins)
router.patch(
  "/users/:id",
  verifyTokenUser,
  checkRole("admin"),
  userController.updateUser
);

export default router;
