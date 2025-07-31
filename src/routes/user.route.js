import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { verifyTokenUser } from "../middlewares/auth.middlewares.js";
import { adminAuth } from "../middlewares/admin.auth.js";

const router = Router();

// Registro de novo usuário
router.post("/register", userController.create);

// Login do usuário
router.post("/login", userController.login);

// admin vê todos os usuários
router.get("/users", adminAuth, userController.findAllUsers);

// Perfil do usuário autenticado
router.get("/profile", verifyTokenUser, userController.getProfile);

// contar usuários (apenas para admins)
router.get("/users/count", adminAuth, userController.countUsers);

// Ver um usuário especifico
router.get("/users/:id", adminAuth, userController.findById);

// Excluir um usuário (apenas para admins)
router.delete("/users/:id", adminAuth, userController.deleteUser);

// Atualizar um usuário (apenas para admins)
router.patch("/users/:id", adminAuth, userController.updateUser);

export default router;
