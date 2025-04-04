import express from "express";
import connectDataBase from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

const port = 4000;
const app = express();

connectDataBase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
