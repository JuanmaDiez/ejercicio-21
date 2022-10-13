const { Article, User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const JWT_STRING_SECRETO = process.env.JWT_STRING_SECRETO;

async function storeUser(req, res) {
  const user = await User.create({
    ...req.body,
  });
  res.status(201).json(user);
}

async function login(req, res) {
  const user = await User.findOne({ where: { email: req.body.email } });
  console.log(req.body);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  const checkPassword = await user.passwordCheck(req.body.password);
  if (!checkPassword) {
    return res.status(403).json({ message: "Contraseña incorrecta" });
  }
  const payload = {
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_STRING_SECRETO);
  return res.status(201).json({ token });
}
async function index(req, res) {
  if (!req.query.author && !req.query.title) {
    const articles = await Article.findAll();
    res.json(articles);
  }
  if (req.query.author) {
    const articles = await Article.findAll({
      include: {
        model: User,
        where: { [Op.or]: [{ firstname: req.query.author }, { lastname: req.query.author }] },
      },
    });
    return res.json(articles);
  } else {
    const articles = await Article.findAll({
      where: { title: { [Op.like]: `%${req.query.title}%` } },
    });
    return res.json(articles);
  }
}

async function store(req, res) {
  const article = await Article.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });
  res.status(201).json(article);
}

async function update(req, res) {
  await Article.update(
    {
      ...req.body,
    },
    { where: { id: req.params.id } },
  );
  res.status(200).json({ message: "Cambiado correctamente" });
}

async function destroy(req, res) {
  await Article.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({ message: "El usuario fue eliminado correctament" });
}
module.exports = {
  index,
  store,
  update,
  destroy,
  storeUser,
  login,
};
