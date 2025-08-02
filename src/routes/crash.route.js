import { Router } from "express";
import crashController from "../controllers/crash.controller.js";
import { ValidId, ValidCrash } from "../middlewares/global.middlewares.js";
import { verifyTokenUser } from "../middlewares/auth.middlewares.js";
import { checkRole } from "../middlewares/role.middleware.js";
const router = Router();

// Usuário registra uma ocorrência
router.post("/", verifyTokenUser, crashController.create);

// Usuário vê a própria ocorrência
router.get("/mine", verifyTokenUser, crashController.findUserCrashes);

// Admin vê todos os registros de ocorrências
router.get(
  "/crashes",
  verifyTokenUser,
  checkRole("admin"),
  crashController.findAll
);

router.get(
  "/count",
  verifyTokenUser,
  checkRole("admin"),
  crashController.countCrashes
); // Contar ocorrências

router.get(
  "/last",
  verifyTokenUser,
  checkRole("admin"),
  crashController.findLastCrash
);

// Ver uma ocorrência específica
router.get(
  "/crashes/:id",
  verifyTokenUser,
  checkRole("admin"),
  ValidId,
  ValidCrash,
  crashController.findById
);

// Editar ocorrência
router.patch(
  "/crashes/:id",
  verifyTokenUser,
  checkRole("admin"),
  ValidId,
  ValidCrash,
  crashController.update
);

// Deletar ocorrência
router.delete(
  "/crashes/:id",
  verifyTokenUser,
  checkRole("admin"),
  ValidId,
  ValidCrash,
  crashController.deleteCrash
);

export default router;
