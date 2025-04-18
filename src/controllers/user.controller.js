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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    }); // 24 horas

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

export default { create, login, getProfile, findAllUsers };
