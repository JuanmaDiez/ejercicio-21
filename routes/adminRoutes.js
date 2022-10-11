const express = require("express");
const adminRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");
const userController = require("../controllers/userController");
const checkIfAuthenticated = require("../middlewares/checkIfAuthenticated");
const checkIfWriter = require("../middlewares/checkIfWriter");
const checkIfAdmin = require("../middlewares/checkIfAdmin");
const checkIfCanEdit = require("../middlewares/checkIfCanEdit");
const checkIfCanDelete = require("../middlewares/checkIfCanDelete");

adminRouter.use(checkIfAuthenticated);

adminRouter.get("/", pagesController.showAdmin);

adminRouter.get("/articles/create", checkIfWriter, pagesController.showCrear);

adminRouter.post("/articles", articleController.store);

adminRouter.get("/articles/:id/edit", checkIfWriter, pagesController.showModificar);

adminRouter.patch("/articles/:id/edit", checkIfCanEdit, articleController.edit);

adminRouter.delete("/articles/:id/delete", checkIfCanDelete, articleController.destroy);

adminRouter.get("/users", checkIfAdmin, pagesController.showUsers);

adminRouter.delete("/users/:id/delete", userController.destroy);

adminRouter.get("/users/:id/edit", checkIfAdmin, pagesController.showEditUser);

adminRouter.patch("/users/:id/edit", userController.edit);

adminRouter.get("/comments", checkIfAdmin, pagesController.showComments);

adminRouter.get("/comments/:id/edit", checkIfWriter, pagesController.showEditComment);

adminRouter.patch("/comments/:id/edit", checkIfCanEdit, commentController.edit);

adminRouter.delete("/comments/:id/delete", checkIfCanDelete, commentController.destroy);

module.exports = adminRouter;
