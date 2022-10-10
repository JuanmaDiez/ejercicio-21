const express = require("express");
const adminRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const checkIfAuthenticated = require("../middlewares/checkIfAuthenticated");
const checkIfWriter = require("../middlewares/checkIfWriter");
const checkIfAdmin = require("../middlewares/checkIfAdmin");

adminRouter.use(checkIfAuthenticated);

adminRouter.get("/", pagesController.showAdmin);

adminRouter.get("/articles/create", checkIfWriter, pagesController.showCrear);

adminRouter.post("/articles", articleController.store);

adminRouter.get("/articles/:id/edit", checkIfWriter, pagesController.showModificar);

adminRouter.post("/articles/:id/edit", checkIfWriter, articleController.edit);

adminRouter.get("/articles/:id/delete", checkIfWriter, articleController.destroy);

adminRouter.get("/articles/:articleId/comments/:commentId/delete", commentController.destroy);

adminRouter.get("/users", checkIfAdmin, pagesController.showUsers);

adminRouter.get("/users/:id/delete", userController.destroy);

adminRouter.get("/users/:id/edit", checkIfAdmin, pagesController.showEditUser);

adminRouter.post("/users/:id/edit", userController.edit);

module.exports = adminRouter;
