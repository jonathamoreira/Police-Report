import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import authController from "../controllers/auth.controller.js";
import { verifyTokenUser } from "../middlewares/auth.middlewares.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// Admin management
router.post(
  "/",
  verifyTokenUser,
  checkRole("super_admin"),
  adminController.create
); // Criar um novo admin
router.get("/", verifyTokenUser, checkRole("admin"), adminController.findAll); // Listar todos os admins
router.post("/login", authController.login); // Login de um admin
router.get(
  "/count",
  verifyTokenUser,
  checkRole("admin"),
  adminController.countAdmins
); // Contar admins
router.get(
  "/:id",
  verifyTokenUser,
  checkRole("admin"),
  adminController.findById
); // Ver um admin específico
router.put("/:id", verifyTokenUser, checkRole("admin"), adminController.update); // Atualizar um admin específico
router.delete(
  "/:id",
  verifyTokenUser,
  checkRole("admin"),
  adminController.remove
); // Deletar um admin

export default router;
