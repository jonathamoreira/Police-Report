import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

const create = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newAdmin = new Admin({
    ...body,
    password: hashedPassword,
  });
  return newAdmin.save();
};

const findAll = () => Admin.find().select("-password");

const findById = (id) => Admin.findById(id).select("-password");

const update = async (id, body) => {
  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }
  return Admin.findByIdAndUpdate(id, body, { new: true }).select("-password");
};
const remove = (id) => Admin.findByIdAndDelete(id);

const countDocumentsService = () => Admin.countDocuments();

export default {
  create,
  findAll,
  findById,
  update,
  remove,
  countDocumentsService,
};
