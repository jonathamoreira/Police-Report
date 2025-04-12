import dotenv from "dotenv";
dotenv.config();
import AccountUser from "../models/accountUser.js";
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

  console.log("secret", secret);

  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1d" });

  return {
    id: user._id,
    name: user.name,
    token,
  };
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
};
