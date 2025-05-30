# Proyecto Tareas con Express, Sequelize y Socket.io

## Descripción

Aplicación backend para gestión de tareas con almacenamiento en SQLite y notificaciones en tiempo real vía WebSocket usando Socket.io.

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

No es necesario configurar variables de entorno para la base de datos si usas SQLite, ya que se guarda localmente en un archivo dentro del proyecto.

3. Ejecutar la aplicación:

```bash
npm start
```

Por defecto, la aplicación se ejecuta en (http://localhost:8080), pero puedes cambiar el puerto en el archivo `.env`.

---

## Archivos ignorados

El proyecto incluye un `.gitignore` que excluye:

- `node_modules/`
- `database.sqlite`
- `.env`

Si clonas el proyecto:

- Ejecuta `npm install` para reconstruir las dependencias.
- La base de datos SQLite se creará automáticamente al iniciar el servidor (gracias a `sequelize.sync()`).

---

## Endpoints principales

- Obtener todas las tareas: `GET /tasks`
- Crear tarea: `POST /tasks`
- Actualizar tarea: `PUT /tasks/:id`
- Eliminar tarea (soft delete): `DELETE /tasks/:id`

---

## Cómo probar WebSocket

1. Ejecuta la aplicación (`npm start`).
2. Abre en tu navegador:
   [http://localhost:8080/test.html]
3. Usa Postman o cURL para enviar peticiones a los endpoints (ver sección anterior).
4. Si todo funciona bien, deberías ver las actualizaciones reflejadas en tiempo real en la página.

---

## Diseño y consideraciones

- Uso de SQLite para persistencia ligera, sin necesidad de instalar un servidor de base de datos.
- Las tablas se crean automáticamente usando `sequelize.sync()` al arrancar el servidor.
- WebSocket integrado directamente con el servidor Express usando Socket.io.
- Las tareas eliminadas no se eliminan físicamente: se marcan con estado `eliminada` (soft delete) y se filtran al consultar.
- Los campos opcionales, como la descripción, se manejan con valores por defecto para evitar mostrar `null`.
- La API incluye validaciones básicas para asegurar la integridad de los datos.

---

## Ejecutar pruebas

- Para correr las pruebas integradas utiliza el siguiente comando:
- npm test
- Estas pruebas cubren las rutas principales y validaciones de entrada.
  Nota: No se implementaron pruebas unitarias para la lógica interna, ya que se usó express-validator para la validación y los tests se enfocan en el comportamiento de las rutas.
