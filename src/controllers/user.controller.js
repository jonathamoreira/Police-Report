import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, phone, plate1, plate2, address, description } = req.body;

    if (!name || !phone || !plate1 || !address || !description) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }
    const user = await userService.createService(req.body);

    if (!user) {
      return res.status(400).send({
        message: "Error creating User",
      });
    }

    res.status(201).send({
      message: "User created succssfully!",
      user: {
        id: user._id,
        name,
        phone,
        plate1,
        plate2,
        address,
        description,
        createAt: user.createAt,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (!users.length === 0) {
      return res.status(400).send({
        message: "Error finding users",
      });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
    console.log(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const update = async (req, res) => {
  try {
    const { name, phone, plate1, plate2, address, description } = req.body;

    if (!name || !phone || !plate1 || !address || !description) {
      res.status(400).send({ message: "Submit all fields for registration" });
    }
    const user = await userService.updateService(req.user._id, req.body);

    if (!user) {
      return res.status(400).send({
        message: "Error updating User",
      });
    }

    res.status(200).send({
      message: "User updated succssfully!",
      user: {
        id: user._id,
        name,
        phone,
        plate1,
        plate2,
        address,
        description,
        createAt: user.createAt,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteService(req.user._id);

    if (!user) {
      return res.status(400).send({
        message: "Error deleting User",
      });
    }

    res.status(200).send({
      message: "User deleted succssfully!",
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const userController = {
  create,
  findAll,
  findById,
  update,
  deleteUser,
};

export default userController;
