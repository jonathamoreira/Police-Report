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

export default { create, findAll, findById };
