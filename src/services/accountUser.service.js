import dotenv from "dotenv";
dotenv.config();
import AccountUser from "../models/AccountUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const create = async (body) => {
  const newUser = new AccountUser(body);
  return await newUser.save();
};

const login = async (email, password) => {
  const user = await AccountUser.findOne({ email }).select("+password");
  if (!user) throw new Error("Usuário não encontrado.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Senha incorreta.");

  return user;
};
const findAll = async () => {
  return await AccountUser.find().select("-password"); // evita retornar a senha
};

const getProfile = async (id) => {
  const user = await AccountUser.findById(id).select("-password");
  if (!user) throw new Error("Usuário não encontrado.");
  return user;
};

export default {
  create,
  login,
  getProfile,
  findAll,
};
