import adminService from "../services/admin.service.js";
import jwt from "jsonwebtoken";

// Função para criar um novo admin
const create = async (req, res) => {
  try {
    const { name, matricula, password } = req.body;

    if (!name || !matricula || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Cria o admin
    const admin = await adminService.create({ name, matricula, password });

    // Retornar o admin
    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        matricula: admin.matricula,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    res.status(500).json({ message: "Internal server error", error });
  }
};

const findAll = async (req, res) => {
  try {
    const admins = await adminService.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// No controller de admin, a função para listar todos os usuários
const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll(); // Aqui busca todos os usuários
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminService.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, matricula, password } = req.body;
    const admin = await adminService.update(id, { name, matricula, password });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminService.remove(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
export default {
  create,
  findAll,
  findAllUsers,
  findById,
  update,
  remove,
};
