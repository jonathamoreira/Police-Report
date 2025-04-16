const Router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("../swagger.json"); // Adjust the path as necessary

Router.use("/", swaggerUi.serve);
Router.get("/", swaggerUi.setup(swaggerDocumentation, { explorer: true }));

module.exports = Router;
// import Router from "express";
// const router = Router();

// import swaggerUi from "swagger-ui-express";
// import swaggerDocumentation from "../swagger.json" assert { type: "json" };

// router.use("/", swaggerUi.serve);
// router.get("/", swaggerUi.setup(swaggerDocumentation, { explorer: true }));

// export default router;
