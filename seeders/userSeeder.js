const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  users.push({
    firstname: "Juan",
    lastname: "Diez",
    email: "juan@diez",
    password: "1234",
    role: 4,
  });
  for (let i = 0; i < 15; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: "1234",
      role: faker.datatype.number({
        min: 1,
        max: 4,
      }),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
