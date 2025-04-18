import { Router } from "express";
import crashController from "../controllers/crash.controller.js";
import { ValidId, ValidCrash } from "../middlewares/global.middlewares.js";
import { verifyTokenUser } from "../middlewares/auth.middlewares.js";
import { adminAuth } from "../middlewares/admin.auth.js";
const router = Router();

// Usuário registra uma ocorrência
router.post("/", verifyTokenUser, crashController.create);

// Usuário vê a própria ocorrência
router.get("/mine", verifyTokenUser, crashController.findUserCrashes);

// Admin vê todos os registros de ocorrências
router.get("/crashes", adminAuth, crashController.findAll);

// Ver uma ocorrência específica
router.get(
  "/crashes/:id",
  adminAuth,
  ValidId,
  ValidCrash,
  crashController.findById
);

// Editar ocorrência
router.patch(
  "/crashes/:id",
  adminAuth,
  ValidId,
  ValidCrash,
  crashController.update
);

// Deletar ocorrência
router.delete(
  "/crashes/:id",
  adminAuth,
  ValidId,
  ValidCrash,
  crashController.deleteCrash
);
export default router;
