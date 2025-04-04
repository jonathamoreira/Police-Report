import mongoose from "mongoose";
import userService from "../services/user.service.js";

export const ValidId = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const ValidUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findByIdService(id);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
