const { Article } = require("../models");

async function checkIfCanEdit(req, res, next) {
  const article = await Article.findOne({ where: { id: req.params.id } });
  if (req.user.role >= 3 || req.user.id == article.id) {
    return next();
  } else res.redirect("back");
}

module.exports = checkIfCanEdit;
