import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "./emailService.js";
import crypto from "crypto";

const secret = process.env.JWT_SECRET;

const verifyEmail = async (token) => {
  console.log("Token recebido (raw):", token);

  // Gera o hash exatamente da mesma forma que quando salvou
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log("Token após hash:", hashedToken);

  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() },
  });

  console.log("User encontrado:", user ? user._id : null);

  if (!user) {
    throw new Error("Token de verificação inválido ou expirado.");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;

  await user.save();

  return user;
};
const create = async (body) => {
  const { name, email, password } = body;
  // Gerar o token de verificação
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  const verificationTokenExpires = new Date(Date.now() + 3600000); // Token válido por 1 hora

  const newUser = new User({
    name,
    email,
    password,
    isVerified: false,
    verificationToken: hashedVerificationToken,
    verificationTokenExpires,
  });

  const savedUser = await newUser.save();

  // Enviar o e-mail de verificação
  await sendVerificationEmail(
    savedUser.email,
    savedUser.name,
    verificationToken
  );

  return savedUser;
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

const findByIdService = async (id) => {
  return await User.findById(id).select("-password");
};

const deleteService = async (id) => {
  return await User.findByIdAndDelete(id);
};

const updateService = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true }).select(
    "-password"
  );
};

const countDocumentsService = () => User.countDocuments();

export default {
  verifyEmail,
  create,
  login,
  getProfile,
  countDocumentsService,
  findAll,
  findByIdService,
  deleteService,
  updateService,
};
