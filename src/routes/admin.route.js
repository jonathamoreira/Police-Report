import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import crashController from "../controllers/crash.controller.js";
import { ValidId, ValidCrash } from "../middlewares/global.middlewares.js";
import { adminAuth } from "../middlewares/admin.auth.js";

const router = Router();

// Admin management
router.post("/", adminController.create); // Criar um novo admin
router.get("/", adminController.findAll); // Listar todos os admins
router.get("/:id", adminController.findById); // Ver um admin específico
router.put("/:id", adminController.update); // Atualizar um admin específico
router.delete("/:id", adminController.remove); // Deletar um admin

// Crash management (somente admins)
router.get("/crashes", adminAuth, crashController.findAll); // Ver todos os registros de ocorrências
router.get("/crashes/:id", ValidId, ValidCrash, crashController.findById); // Ver uma ocorrência específica
router.patch("/crashes/:id", ValidId, ValidCrash, crashController.update); // Editar ocorrência
router.delete("/crashes/:id", ValidId, ValidCrash, crashController.deleteCrash); // Deletar ocorrência

export default router;
