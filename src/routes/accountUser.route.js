import { Router } from "express";
import accountUserController from "../controllers/accountUser.controller.js";
import { verifyTokenUser } from "../middlewares/auth.middlewares.js";

const router = Router();

// Registro de novo usuário com login
router.post("/register", accountUserController.create);

// Login do usuário
router.post("/login", accountUserController.login);

// Perfil do usuário autenticado
router.get("/profile", verifyTokenUser, accountUserController.getProfile);

export default router;
