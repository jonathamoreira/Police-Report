import { Router } from "express";
import adminController from "../controllers/admin.controller.js";

const router = Router();

router.post("/", adminController.create); // Create a new admin
router.get("/", adminController.findAll); // show all admins
router.get("/:id", adminController.findById); // show a specific admin
router.put("/:id", adminController.update); // update a specific admin
router.delete("/:id", adminController.remove); // delete a specific admin

export default router;
