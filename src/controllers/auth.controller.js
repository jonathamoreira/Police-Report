import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { matricula, password } = req.body;

    if (!matricula || !password) {
      return res
        .status(400)
        .json({ message: "Matricula and password are required" });
    }
    const admin = await Admin.findOne({ matricula }).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Erro no login", error);
    return res.status(500).json({ message: "Erro no login do admin" });
  }
};

export default { login };
