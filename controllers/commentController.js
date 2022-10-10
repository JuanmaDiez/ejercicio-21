const { Comment } = require("../models");
const formidable = require("formidable");

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img/uploads",
  keepExtensions: true,
});

async function store(req, res) {
  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    await Comment.create({
      content: fields.ingresarComentario,
      articleId: req.params.articleId,
      userId: req.user.id,
    });
    res.redirect(`/articles/${req.params.articleId}`);
  });
}

async function destroy(req, res) {
  await Comment.destroy({ where: { id: req.params.commentId } });
  res.redirect(`/articles/${req.params.articleId}`);
}

module.exports = {
  destroy,
  store,
};
