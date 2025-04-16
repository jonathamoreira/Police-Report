import Crash from "../models/Crash.js";

const createService = (body) => Crash.create(body);

const findAllService = () => Crash.find();

const findByUserIdService = (userId) => Crash.find({ user: userId });

const findByIdService = (id) => Crash.findById(id);

const updateService = (id, body) =>
  Crash.findByIdAndUpdate(id, body, { new: true });

const deleteService = (id) => Crash.findByIdAndDelete(id);

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
  findByUserIdService,
};
