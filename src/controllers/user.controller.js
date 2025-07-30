import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";
// import dotenv from "dotenv";
// dotenv.config();

const create = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({
      message: "User registered successfully",
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Valida o email e a senha do usuário
    const user = await userService.login(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Gerar o token

    const token = jwt.sign(
      { id: user._id, role: user.role }, // <--- inclui role aqui
      process.env.JWT_SECRET,
      { expiresIn: 86400 }
    ); // 24 horas

    // Retorna os dados do usuário e o token
    res.json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token, // Retornando o token
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.userId);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findByIdService(id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    res.status(500).send({ message: "Erro interno do servidor." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteService(id);
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir usuário." });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Você pode adicionar mais validações aqui para outros campos se necessário
    const user = await userService.updateService(id, {
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso.", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar usuário.", error: error.message });
  }
};

export default {
  create,
  login,
  getProfile,
  findById,
  findAllUsers,
  deleteUser,
  updateUser,
};
