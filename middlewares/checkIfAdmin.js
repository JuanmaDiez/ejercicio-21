async function checkIfAdmin(req, res, next) {
  if ((req.user.role = 4)) {
    return next();
  } else res.redirect("back");
}

module.exports = checkIfAdmin;
