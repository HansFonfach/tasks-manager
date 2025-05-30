const { Op } = require("sequelize");
const { Task } = require("../models/task");

const createTask = async (titulo, descripcion) => {
  return await Task.create({ titulo, descripcion });
};

const getTasks = async () => {
  return await Task.findAll({
    where: {
      status: {
        [Op.ne]: "eliminada",
      },
    },
  });
};

const updateTask = async (id, status) => {
  const task = await Task.findByPk(id);
  if (!task)
    throw new Error("Lo sentimos, no hemos encontrado la tarea que buscas.");
  task.status = status;
  task.fechaActualizacion = new Date();
  await task.save();
  return task;
};

const deleteTask = async (id) => {
  const task = await Task.findByPk(id);
  if (!task)
    throw new Error("Lo sentimos, no hemos encontrado la tarea que buscas.");
  task.status = "eliminada";
  task.fechaActualizacion = new Date();
  await task.save();
  return task;
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
