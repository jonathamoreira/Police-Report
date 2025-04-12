import jwt from "jsonwebtoken";
import accountUserService from "../services/accountUser.service.js";

const create = async (req, res) => {
  try {
    const user = await accountUserService.create(req.body);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Valida o email e a senha do usuário
    const user = await accountUserService.login(email, password);

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Gerar o token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: 86400 });

    // Retorna os dados do usuário e o token
    res.json({
      message: "Login bem-sucedido",
      token, // Retornando o token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await accountUserService.getProfile(req.userId);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export default { create, login, getProfile };
