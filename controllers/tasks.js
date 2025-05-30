const { response } = require("express");
const taskService = require("../services/taskService");

module.exports = (io) => {
  const createTasks = async (req, res = response,) => {
    const { titulo, descripcion= ""} = req.body;

    try {
      const newTask = await taskService.createTask(titulo, descripcion);

      io.emit("newTask", { payload: newTask });

      res.json({
        msg: "Tarea creada correctamente.",
        newTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al crear la tarea." });
    }
  };

  const getTasks = async (req, res = response) => {
    try {
      const tasks = await taskService.getTasks();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al obtener tareas." });
    }
  };

  const updateTasks = async (req, res = response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updateTask = await taskService.updateTask(id, status);

      io.emit("taskUpdated", {
        payload: { id: updateTask.id, status: updateTask.status },
      });

      res.json({
        msg: "La tarea ha sido actualizada correctamente.",
        status: updateTask.status,
        fechaActualizacion: updateTask.fechaActualizacion,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ msg: `No hemos podido encontrar la tarea con el id: ${id}` });
    }
  };

  const deleteTasks = async (req, res = response) => {
    const { id } = req.params;

    try {
      const taskDeleted = await taskService.deleteTask(id);

      io.emit("taskDeleted", { payload: { id } });

      res.json({
        msg: `La tarea: ${taskDeleted.titulo},  ha sido eliminada correctamente.`,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ msg: `No hemos podido encontrar la tarea con el id: ${id}` });
    }
  };

  return {
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks,
  };
};
