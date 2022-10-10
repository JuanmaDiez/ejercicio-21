async function checkIfWriter(req, res, next) {
  if (req.user.role >= 2) {
    return next();
  } else res.redirect("back");
}

module.exports = checkIfWriter;
