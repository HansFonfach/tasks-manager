  const { Router } = require("express");
  const { createTaskValidator, idParamValidator, updateStatusValidator } = require("../middlewares/validators");

  module.exports = (io) => {
    const router = Router();

    const {
      createTasks,
      getTasks,
      updateTasks,
      deleteTasks,
    } = require("../controllers/tasks")(io); 

    router.post("/", createTaskValidator, createTasks);
    router.get("/", getTasks);
    router.put("/:id", idParamValidator, updateStatusValidator, updateTasks);
    router.delete("/:id", idParamValidator, deleteTasks);

    return router;
  };
