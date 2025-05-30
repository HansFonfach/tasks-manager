const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pendiente",
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    fechaActualizacion: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false, 
  }
);

module.exports = { Task, sequelize };
