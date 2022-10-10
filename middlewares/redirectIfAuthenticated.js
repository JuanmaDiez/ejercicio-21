function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/articles");
  } else {
    return next();
  }
}

module.exports = redirectIfAuthenticated;
