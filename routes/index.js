const publicRoutes = require("./publicRoutes");
const apiRoutes = require("./apiRoutes");
const adminRoutes = require("./adminRoutes");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

module.exports = (app) => {
  app.use(makeUserAvailableInViews);
  app.use(publicRoutes);
  app.use("/api", apiRoutes);
  app.use("/admin", adminRoutes);
};
