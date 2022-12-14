const { Article } = require("../models");
const formidable = require("formidable");

const form = formidable({
  multiples: true,
  uploadDir: __dirname + "/../public/img/uploads",
  keepExtensions: true,
});

// Display a listing of the resource.
async function index(req, res) {}
// Display the specified resource.
async function show(req, res) {}
// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.crearTitulo,
      content: fields.crearContenido,
      userId: req.user.id,
      img: files.image.newFilename,
    });

    res.redirect("/admin");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  form.parse(req, async (err, fields, files) => {
    await Article.update(
      {
        title: fields.modificarTitulo,
        content: fields.modificarContenido,
        image: files.modificarImagen.newFilename,
      },
      { where: { id: req.params.id } },
    );
  });
  res.redirect("/admin");
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({ where: { id: req.params.id } });
  res.redirect("/admin");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
