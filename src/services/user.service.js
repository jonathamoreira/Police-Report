import User from "../models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (id, body) =>
  User.findByIdAndUpdate(id, body, { new: true });

const deleteService = (id) => User.findByIdAndDelete(id);

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};
