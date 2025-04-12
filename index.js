import dotenv from "dotenv";
dotenv.config();
console.log(process.env.JWT_SECRET);

import express from "express";
import connectDataBase from "./src/database/db.js";
import crashRoute from "./src/routes/crash.route.js";
import adminRoute from "./src/routes/admin.route.js";
import authRoute from "./src/routes/auth.route.js";
import accountUserRoute from "./src/routes/accountUser.route.js";

const port = 4000;
const app = express();

connectDataBase();
app.use(express.json());
app.use("/crash", crashRoute);
app.use("/admin", adminRoute);
app.use("/", authRoute);
app.use("/account-user", accountUserRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
