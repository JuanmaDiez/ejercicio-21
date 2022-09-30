const { Article } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll();
  res.render("home", { articles });
}

async function showAdmin(req, res) {
  const articles = await Article.findAll();
  res.render("admin", { articles });
}

async function showCrear(req, res) {
  res.render("crearArticulo");
}

async function showModificar(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("modificarArticulo", { article });
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showAdmin,
  showCrear,
  showModificar,
  submitModificar,
};
