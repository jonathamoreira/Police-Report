import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidId, ValidUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", ValidId, ValidUser, userController.findById);
router.patch("/:id", ValidId, ValidUser, userController.update);
router.delete("/:id", ValidId, ValidUser, userController.deleteUser);

export default router;
