# Proyecto Tareas con Express, Sequelize y Socket.io

## Descripción

Aplicación backend para gestión de tareas con almacenamiento en SQLite y notificaciones en tiempo real vía WebSocket usando Socket.io. Permite crear, listar, actualizar y eliminar tareas (soft delete).

---

## Requisitos previos

- Node.js (v14 o superior recomendado)
- npm (gestor de paquetes de Node)

---

## Configuración del entorno

1. Clonar el repositorio:

```bash
git clone https://github.com/HansFonfach/tasks-manager
cd tasks-manager
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=80808080
```

> Nota: No es necesario configurar variables para la base de datos, ya que SQLite se maneja localmente.

4. Ejecutar la aplicación:

```bash
node app.js
```

> Nota: tambien puede utilizar el comando nodemon app.js, para no tener que bajar e iniciar el servidor constantemente.

---

## Archivos ignorados

- `node_modules/`
- `database.sqlite`
- `.env`

> Al clonar, recuerda ejecutar `npm install` para instalar dependencias.  
> La base de datos SQLite se creará automáticamente al iniciar el servidor.

---

## Endpoints principales

### Crear tarea

- **URL:** `POST /tasks`
- **Body (JSON):**

```json
{
  "titulo": "realizar prueba",
  "descripcion": "Opcional, puede omitirse"
}
```

- **Notas:**

  - El campo `descripcion` es opcional.
  - Si no se envía `descripcion`, el valor por defecto será cadena vacía `""` (no `null`).
  - El campo `status` se asigna automáticamente como `"pendiente"` al crear la tarea.

- **Respuesta exitosa:**

```json
{
  "message": "Tarea creada exitosamente",
  "task": {
    "id": 1,
    "titulo": "realizar prueba",
    "status": "pendiente",
    "descripcion": "",
    "createdAt": "2025-05-30T10:00:00.000Z",
    "updatedAt": "2025-05-30T10:00:00.000Z"
  }
}
```

---

### Obtener todas las tareas

- **URL:** `GET /tasks`
- **Descripción:** Devuelve todas las tareas que no están marcadas como eliminadas (soft delete).
- **Respuesta ejemplo:**

```json
[
  {
    "id": 1,
    "titulo": "realizar prueba",
    "status": "pendiente",
    "descripcion": "",
    "createdAt": "2025-05-30T10:00:00.000Z",
    "updatedAt": "2025-05-30T10:00:00.000Z"
  }
]
```

---

### Actualizar tarea

- **URL:** `PUT /tasks/:id`
- **Body (JSON):**

```json
{
  "status": "aprobada"
}
```

- **Notas:**

  - Solo es posible actualizar el campo `status`.
  - El campo `status` solo acepta los valores `"pendiente"` o `"aprobada"`.
  - No se puede actualizar la descripción mediante este endpoint.

- **Respuesta exitosa:**

```json
{
  "message": "Tarea actualizada exitosamente",
  "task": {
    "id": 1,
    "titulo": "realizar prueba",
    "status": "aprobada",
    "descripcion": "",
    "createdAt": "2025-05-30T10:00:00.000Z",
    "updatedAt": "2025-05-30T11:00:00.000Z"
  }
}
```

---

### Eliminar tarea (soft delete)

- **URL:** `DELETE /tasks/:id`
- **Respuesta exitosa:**

```json
{
  "message": "Tarea eliminada"
}
```

> La tarea no se borra físicamente, solo se marca con estado `"eliminada"` y no aparecerá en los listados.

---

## Cómo probar la API con Postman

1. Abre Postman.
2. Para crear tarea:
   - Método: POST
   - URL: `http://localhost:8080/tasks`
   - Body: raw JSON con `{ "titulo": "mi tarea", "descripcion": "opcional" }` o sin descripción `{ "titulo": "mi tarea" }`
3. Para obtener tareas:
   - Método: GET
   - URL: `http://localhost:8080/tasks`
4. Para actualizar tarea:
   - Método: PUT
   - URL: `http://localhost:8080/tasks/1` (cambia 1 por el id)
   - Body: raw JSON con `{ "status": "aprobada" }`
5. Para eliminar tarea:
   - Método: DELETE
   - URL: `http://localhost:8080/tasks/1`

---

## Cómo probar la API con curl

- Crear tarea con descripción:

```bash
curl -X POST http://localhost:8080/tasks -H "Content-Type: application/json" -d '{"titulo":"mi tarea","descripcion":"opcional"}'
```

- Crear tarea sin descripción (valor por defecto `""`):

```bash
curl -X POST http://localhost:8080/tasks -H "Content-Type: application/json" -d '{"titulo":"mi tarea"}'
```

- Obtener tareas:

```bash
curl http://localhost:8080/tasks
```

- Actualizar tarea (solo estado):

```bash
curl -X PUT http://localhost:8080/tasks/1 -H "Content-Type: application/json" -d '{"status":"aprobada"}'
```

- Eliminar tarea:

```bash
curl -X DELETE http://localhost:8080/tasks/1
```

---

## Cómo probar WebSocket

1. Ejecuta la aplicación (`node app.js`).
2. Abre en tu navegador el archivo de prueba WebSocket:  
   [http://localhost:8080/test.html](http://localhost:8080/test.html)
3. Usa Postman o curl para enviar peticiones a los endpoints.
4. Las actualizaciones se reflejarán en tiempo real en la página WebSocket.

---

## Diseño y consideraciones

- Base de datos SQLite, sin necesidad de configuración extra.
- Tablas creadas automáticamente con `sequelize.sync()`.
- Integración WebSocket con Socket.io para notificaciones en tiempo real.
- Soft delete para eliminar tareas sin borrarlas físicamente.
- Validaciones básicas para mantener integridad de datos.
- Campos opcionales, como descripción, manejados con valor por defecto cadena vacía `""`.

---

## Ejecutar pruebas automáticas

- Para correr las pruebas integradas, usa:

```bash
npm test
```

> Las pruebas cubren rutas principales y validaciones con `express-validator`.  
> No se implementaron pruebas unitarias internas.
