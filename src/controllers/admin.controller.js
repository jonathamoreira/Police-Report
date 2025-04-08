import adminService from "../services/admin.service.js";

const create = async (req, res) => {
  try {
    const { name, matricula, password } = req.body;
    if (!name || !matricula || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const admin = await adminService.create({
      name,
      matricula,
      password,
    });
    res.status(201).json(admin);
  } catch (error) {
    // Check if the error is a validation error or a duplicate key error
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
    res.status(500).json({ message: "Erro ao buscar Admins" });
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
    res.status(200).json(admin);
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
  findById,
  update,
  remove,
};
