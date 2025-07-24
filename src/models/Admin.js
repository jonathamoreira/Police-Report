import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  matricula: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    trim: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "admin",
  },
});
// 👇 Middleware para capitalizar a primeira letra do name
AdminSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  next();
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
