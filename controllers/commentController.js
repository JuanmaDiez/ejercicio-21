const { Comment } = require("../models");

async function store(req, res) {
  await Comment.create({
    content: req.body.ingresarComentario,
    articleId: req.params.articleId,
    userId: req.user.id,
  });
  res.redirect(`/articles/${req.params.articleId}`);
}

async function destroy(req, res) {
  await Comment.destroy({ where: { id: req.params.commentId } });
  res.redirect(`/articles/${req.params.articleId}`);
}

module.exports = {
  destroy,
  store,
};
