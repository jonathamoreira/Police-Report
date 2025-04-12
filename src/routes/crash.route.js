import { Router } from "express";
import crashController from "../controllers/crash.controller.js";
import { ValidId, ValidCrash } from "../middlewares/global.middlewares.js";
import { verifyTokenUser } from "../middlewares/auth.middlewares.js";

const router = Router();

// Usuário registra uma ocorrência
router.post("/", verifyTokenUser, crashController.create);

// Usuário visualiza apenas a própria ocorrência
router.get(
  "/:id",
  verifyTokenUser,
  ValidId,
  ValidCrash,
  crashController.findById
);

export default router;
