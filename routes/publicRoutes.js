const express = require("express");
const passport = require("passport");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");
const checkIfAuthenticated = require("../middlewares/checkIfAuthenticated");

publicRouter.get("/", pagesController.showHome);

publicRouter.get("/login", redirectIfAuthenticated, pagesController.showLogin);

publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  }),
);

publicRouter.get("/register", redirectIfAuthenticated, pagesController.showRegister);

publicRouter.post("/register", userController.create);

publicRouter.get("/logout", pagesController.logOut);

publicRouter.get("/articles/:id", pagesController.showArticulo);

publicRouter.post("/articles/:articleId/comments", checkIfAuthenticated, commentController.store);

module.exports = publicRouter;
