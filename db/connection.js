const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false, // <--- aquí desactivas logs SQL
});

module.exports = sequelize;