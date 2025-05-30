const express = require("express");
const http = require("http");
const { Server: SocketIOServer } = require("socket.io");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
     if (!this.port) {
      console.error("Error: Variable de entorno PORT no definida. Por favor, configure el archivo .env. Si tiene dudas consulte el archivo Readme.md");
      process.exit(1); 
    }

    this.server = http.createServer(this.app);
    this.io = new SocketIOServer(this.server);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));

    this.app.use(express.json());
  }

  routes() {
    this.app.use("/tasks", require("../routes/tasks")(this.io));
  }

  sockets() {
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado:", socket.id);

      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    });
  }

  listen() {
    this.server
      .listen(this.port, () => {
        console.log("Servidor corriendo en puerto:", this.port);
      })
      .on("error", (err) => {
        console.error("Error al iniciar servidor:", err);
      });
  }
}

module.exports = Server;
