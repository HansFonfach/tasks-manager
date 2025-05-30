const Server = require("./models/server");
const { sequelize } = require("./models/task");

require("dotenv").config();

const server = new Server();

sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.error("Error al sincronizar la base de datos:", err));

server.listen();
