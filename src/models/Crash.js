import mongoose from "mongoose";
//import bcrypt from "bcrypt";

const CrahsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    plate1: {
      type: String,
      required: true,
      uppercase: true,
    },
    plate2: {
      type: String,
      required: false,
      uppercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Crash = mongoose.model("Crash", CrahsSchema);

export default Crash;
