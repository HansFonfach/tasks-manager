const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

// Mock service y controladores (los tuyos de verdad, o mocks)
const taskService = require("../services/taskService");

// Mock io con jest.fn()
const ioMock = { emit: jest.fn() };

const tasksController = require("../controllers/tasks")(ioMock);
const tasksRoutes = require("../routes/tasks")(ioMock);

const app = express();
app.use(bodyParser.json());
app.use("/tasks", tasksRoutes);

describe("API Tasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /tasks debe devolver JSON con tareas", async () => {
    const fakeTasks = [
      { id: 1, titulo: "Tarea 1", status: "pendiente" },
      { id: 2, titulo: "Tarea 2", status: "en progreso" },
    ];
    jest.spyOn(taskService, "getTasks").mockResolvedValue(fakeTasks);

    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeTasks);
    expect(taskService.getTasks).toHaveBeenCalled();
  });

  test("POST /tasks crea tarea y emite evento", async () => {
    const newTask = { id: 1, titulo: "Nueva tarea", descripcion: "" };
    jest.spyOn(taskService, "createTask").mockResolvedValue(newTask);

    const res = await request(app)
      .post("/tasks")
      .send({ titulo: "Nueva tarea", descripcion: "" });

    expect(res.statusCode).toBe(200);
    expect(res.body.newTask).toEqual(newTask);
    expect(ioMock.emit).toHaveBeenCalledWith("newTask", { payload: newTask });
    expect(taskService.createTask).toHaveBeenCalledWith("Nueva tarea", "");
  });

  test("PUT /tasks/:id actualiza estado y emite evento", async () => {
    const updatedTask = { id: 1, status: "completada" };
    jest.spyOn(taskService, "updateTask").mockResolvedValue(updatedTask);

    const res = await request(app)
      .put("/tasks/1")
      .send({ status: "completada" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("completada");
    expect(ioMock.emit).toHaveBeenCalledWith("taskUpdated", {
      payload: { id: updatedTask.id, status: updatedTask.status },
    });
    expect(taskService.updateTask).toHaveBeenCalledWith("1", "completada");
  });

  test("PUT /tasks/:id con id no existente responde error", async () => {
    jest.spyOn(taskService, "updateTask").mockImplementation(() => {
      throw new Error("No encontrada");
    });

    const res = await request(app)
      .put("/tasks/999")
      .send({ status: "completada" });

    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toMatch(/No hemos podido encontrar la tarea/);
    expect(ioMock.emit).not.toHaveBeenCalled();
  });

  test("PUT /tasks/:id con id no existente responde error", async () => {
    jest
      .spyOn(taskService, "updateTask")
      .mockRejectedValue(new Error("No encontrada"));

    const res = await request(app)
      .put("/tasks/999")
      .send({ status: "completada" });

    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toMatch(/No hemos podido encontrar la tarea/);
    expect(ioMock.emit).not.toHaveBeenCalled();
  });

  test("DELETE /tasks/:id con id no existente responde error", async () => {
    jest
      .spyOn(taskService, "deleteTask")
      .mockRejectedValue(new Error("No encontrada"));

    const res = await request(app).delete("/tasks/999");

    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toMatch(/No hemos podido encontrar la tarea/);
    expect(ioMock.emit).not.toHaveBeenCalled();
  });
});
test("POST /tasks con título vacío devuelve error 400", async () => {
  const res = await request(app)
    .post("/tasks")
    .send({ titulo: "", descripcion: "Descripción opcional" });

  expect(res.statusCode).toBe(400);
  expect(res.body.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        msg: "El título es obligatorio.",
        path: "titulo",
      }),
    ])
  );
});

test("POST /tasks con título demasiado largo devuelve error 400", async () => {
  const longTitle = "a".repeat(101);
  const res = await request(app)
    .post("/tasks")
    .send({ titulo: longTitle, descripcion: "Descripción opcional" });

  expect(res.statusCode).toBe(400);
  expect(res.body.errors).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        msg: "El título no puede superar 100 caracteres.",
        path: "titulo",
      }),
    ])
  );
});
