import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { ValidId, ValidUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", ValidId, ValidUser, userController.findById);

export default router;
