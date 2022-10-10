const { User, Article } = require("../models");
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
async function create(req, res) {
  const user = await User.Create({
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  if (created) {
    req.login(user, () => res.redirect("/admin"));
  } else {
    res.redirect("back");
  }
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {
  form.parse(req, async (err, fields, files) => {
    await User.update(
      {
        firstname: fields.editName,
        lastname: fields.editLastname,
        email: fields.editEmail,
        password: fields.editPassword,
        role: fields.editRole,
      },
      { where: { id: req.params.id } },
    );
  });
  res.redirect("/admin/users");
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({ where: { userId: req.params.id } });
  await User.destroy({ where: { id: req.params.id } });
  res.redirect("/admin/users");
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
