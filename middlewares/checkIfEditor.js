async function checkIfEditor(req, res, next) {
  if (req.user.role >= 3) {
    return next();
  } else res.redirect("back");
}

module.exports = checkIfEditor;
