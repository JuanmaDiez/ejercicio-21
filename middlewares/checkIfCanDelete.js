const { Article } = require("../models");

async function checkIfCanDelete(req, res, next) {
  const article = await Article.findOne({ where: { id: req.params.id } });
  if (req.user.role >= 4 || req.user.id == article.userId) {
    return next();
  } else return res.redirect("back");
}

module.exports = checkIfCanDelete;
