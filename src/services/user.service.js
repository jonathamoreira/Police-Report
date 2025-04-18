import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const create = async (body) => {
  const newUser = new User(body);
  return await newUser.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Usuário não encontrado.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Senha incorreta.");

  return user;
};
const findAll = async () => {
  return await User.find().select("-password"); // evita retornar a senha
};

const getProfile = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("Usuário não encontrado.");
  return user;
};

export default {
  create,
  login,
  getProfile,
  findAll,
};
