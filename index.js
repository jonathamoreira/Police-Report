import dotenv from "dotenv";

import express from "express";
import connectDataBase from "./src/database/db.js";
import crashRoute from "./src/routes/crash.route.js";
import adminRoute from "./src/routes/admin.route.js";
import accountUserRoute from "./src/routes/accountUser.route.js";
import swaggerRoute from "./src/routes/swagger.route.cjs";

dotenv.config();

const port = 4000;
const app = express();

connectDataBase();
app.use("/doc", swaggerRoute);
app.use(express.json());
app.use("/crash", crashRoute);
app.use("/", adminRoute);
app.use("/account-user", accountUserRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
