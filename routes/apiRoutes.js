const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const { expressjwt: checkJwt } = require("express-jwt");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;

apiRouter.post("/register", apiController.storeUser);

apiRouter.post("/tokens", apiController.login);

apiRouter.get(
  "/articles",
  checkJwt({ secret: JWT_STRING_SECRETO, algorithms: ["HS256"] }),
  apiController.index,
);

apiRouter.post("/articles", apiController.store);

apiRouter.patch("/articles/:id", apiController.update);

apiRouter.delete("/articles/:id", apiController.destroy);

module.exports = apiRouter;
