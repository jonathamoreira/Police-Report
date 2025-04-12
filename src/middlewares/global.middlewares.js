import mongoose from "mongoose";
import crashService from "../services/crash.service.js";

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

export const ValidCrash = async (req, res, next) => {
  try {
    const { id } = req.params;
    const crash = await crashService.findByIdService(id);
    if (!crash) {
      return res.status(400).send({ message: "Crash not found" });
    }
    req.crash = crash;
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
