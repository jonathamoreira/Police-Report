import e from "express";
import { nanoid } from "nanoid";
import crashService from "../services/crash.service.js";

const create = async (req, res) => {
  try {
    const { name, phone, plate1, plate2, address, description } = req.body;

    if (!name || !phone || !plate1 || !address || !description) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration" });
    }
    const userId = req.userId;

    const crash = await crashService.createService({
      ...req.body,
      user: userId,
    });

    if (!crash) {
      return res.status(400).send({
        message: "Error creating crash",
      });
    }

    res.status(201).send({
      message: "Crash registered successfully!",
      crash: {
        id: crash._id,
        name,
        phone,
        plate1,
        plate2,
        address,
        description,
        createdAt: crash.createdAt,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const crash = await crashService.findByIdService(req.params.id);
    if (!crash) {
      return res.status(404).send({ message: "Crash not found" });
    }
    res.send(crash);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findUserCrashes = async (req, res) => {
  try {
    const userId = req.userId;
    const crashes = await crashService.findByUserIdService(userId);

    if (!crashes.length) {
      return res
        .status(404)
        .send({ message: "No crashes found for this user" });
    }

    res.status(200).send(crashes);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const crashes = await crashService.findAllService();
    if (!crashes.length) {
      return res.status(404).send({ message: "No crashes found" });
    }
    res.status(200).send(crashes);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteCrash = async (req, res) => {
  try {
    const crash = await crashService.deleteService(req.params.id);

    if (!crash) {
      return res.status(400).send({
        message: "Error deleting crash",
      });
    }

    res.status(200).send({
      message: "Crash deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, plate1, plate2, address, description } = req.body;

    if (!name || !phone || !plate1 || !address || !description) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration" });
    }

    const crash = await crashService.updateService(id, {
      name,
      phone,
      plate1,
      plate2,
      address,
      description,
    });

    if (!crash) {
      return res.status(400).send({
        message: "Error updating crash",
      });
    }

    res.status(200).send({
      message: "Crash updated successfully!",
      crash: {
        id: crash._id,
        name,
        phone,
        plate1,
        plate2,
        address,
        description,
        createdAt: crash.createdAt,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const crashController = {
  create,
  findById,
  findAll,
  deleteCrash,
  update,
  findUserCrashes,
};

export default crashController;
