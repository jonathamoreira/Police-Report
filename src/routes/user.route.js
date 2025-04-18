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

export default router;
