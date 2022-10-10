const { Article, User, Comment } = require("../models");
const { Op } = require("sequelize");

async function showHome(req, res) {
  const authorFilter = req.query.authorFilter;
  const titleFilter = req.query.titleFilter;
  console.log(titleFilter);
  if (!authorFilter && !titleFilter) {
    const articles = await Article.findAll({ include: "user" });
    res.render("home", { articles });
  }
  if (authorFilter) {
    const user = await User.findOne({
      where: { [Op.or]: [{ firstname: authorFilter }, { lastname: authorFilter }] },
    });
    const articles = await Article.findAll({ include: "user", where: { userId: user.id } });
    res.render("home", { articles });
  }
  if (titleFilter) {
    const articles = await Article.findAll({
      include: "user",
      where: { title: { [Op.like]: `%${titleFilter}%` } },
    });
    res.render("home", { articles });
  }
}

function showLogin(req, res) {
  res.render("login");
}

function showRegister(req, res) {
  res.render("register");
}

function logOut(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function showAdmin(req, res) {
  const articles = await Article.findAll();
  res.render("admin", { articles });
}

async function showCrear(req, res) {
  res.render("createArticle");
}

async function showModificar(req, res) {
  const article = await Article.findByPk(req.params.id, { include: "user" });
  res.render("editArticle", { article });
}

async function showArticulo(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [
      {
        model: User,
      },
    ],
  });
  const comments = await Comment.findAll({
    where: { articleId: article.id },
    include: { model: User, paranoid: false },
  });
  res.render("articulo", { article, comments });
}

async function showComentar(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("addComment", { article });
}

async function showArticles(req, res) {
  const articles = await Article.findAll();
  res.json(articles);
}

async function showUsers(req, res) {
  const users = await User.findAll();
  res.render("users", { users });
}

async function showEditUser(req, res) {
  const user = await User.findOne({ where: { id: req.params.id } });
  res.render("editUser", { user });
}
// Otros handlers...
// ...

module.exports = {
  showHome,
  showAdmin,
  showCrear,
  showModificar,
  showArticulo,
  showComentar,
  showArticles,
  showLogin,
  showRegister,
  logOut,
  showUsers,
  showEditUser,
};
