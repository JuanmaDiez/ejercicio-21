const { Comment } = require("../models");
const formidable = require("formidable");

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img/uploads",
  keepExtensions: true,
});

async function store(req, res) {
  form.parse(req, async (err, fields, files) => {
    await Comment.create({
      content: fields.ingresarComentario,
      articleId: req.params.articleId,
      userId: req.user.id,
    });
    res.redirect(`/articles/${req.params.articleId}`);
  });
}

async function edit(req, res) {
  form.parse(req, async (err, fields, files) => {
    await Comment.update(
      {
        content: fields.modificarContenidoComentario,
      },
      { where: { id: req.params.id } },
    );
    res.redirect("/admin/comments");
  });
}
async function destroy(req, res) {
  await Comment.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/comments");
}

module.exports = {
  destroy,
  edit,
  store,
};
