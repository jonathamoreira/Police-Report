import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import authController from "../controllers/auth.controller.js";
import { adminAuth } from "../middlewares/admin.auth.js";

const router = Router();

// Admin management
router.post("/", adminController.create); // Criar um novo admin
router.get("/", adminAuth, adminController.findAll); // Listar todos os admins
router.post("/login", authController.login); // Login de um admin
router.get("/:id", adminAuth, adminController.findById); // Ver um admin específico
router.put("/:id", adminAuth, adminController.update); // Atualizar um admin específico
router.delete("/:id", adminAuth, adminController.remove); // Deletar um admin

export default router;
