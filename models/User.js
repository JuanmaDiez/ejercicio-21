const bcrypt = require("bcryptjs");
const { Article } = require("./index");

module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {
    async passwordCheck(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
    },
    {
      paranoid: true,
      sequelize,
      modelName: "user",
    },
  );

  User.beforeCreate(async (user, options) => {
    const passwordHasheado = await bcrypt.hash(user.password, 10);
    user.password = passwordHasheado;
  });

  User.beforeBulkCreate(async (users, options) => {
    for (const user of users) {
      const passwordHasheado = await bcrypt.hash(user.password, 10);
      user.password = passwordHasheado;
    }
  });

  return User;
};
