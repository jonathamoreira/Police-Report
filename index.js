import express from "express";
import connectDataBase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";
import adminRoute from "./src/routes/admin.route.js";
import authRoute from "./src/routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();

const port = 4000;
const app = express();

connectDataBase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/", authRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
