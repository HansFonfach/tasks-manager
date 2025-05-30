# Proyecto Tareas con Express, Sequelize y Socket.io

## Descripción

Aplicación backend para gestión de tareas con almacenamiento en SQLite y notificaciones en tiempo real vía WebSocket con Socket.io.

---

## Configuración del entorno

1. Clonar el repositorio:


git clone <url-del-repositorio>

cd <nombre-carpeta>


2. Instalar dependencias:

npm install

No es necesario que configures variables de entorno para la bd, ya que si usas SQLite, la base de datos se guarda localmente en un archivo dentro del proyecto.

3. Ejecución de la aplicación.

npm start

por defecto el puerto en http://localhost:8080 (lo puedes configurar para usar otro puerto)

## Uso y funcionalidades

- CRUD de tareas con API REST.
- Validaciones de entradas para los endopint.
- Notificaciones en tiempo rela con websocket con Socket.io
- Las tareas con estado "eliminada" no son visibles.

## Diseño y consideraciones

- Uso de SQLite para persistencia ligera, sin tener que instalar base de datos.
- Las tablas se crean automáticamente con sequelize.sync() al iniciar el servidor.
- Websocket está integrado directamente en el servidor de Express.
- Eventos de Socket.io para la sincronización de clientes en tiempo real.
- Los campos opcionales fueron manejados con valores por defecto para evitar "null".

## Como probar WebSocket

- Una vez ejecutada la aplicación, abrir el navegador y dirijase a : http://localhost:8080/test.html (el 8080, va a depender del puerto configurado)
- Usar postman o curl para manipular las tareas mediante la API REST:
. crear tarea: POST /tasks
. Actualizar tarea: PUT /tasks/:id
. Eliminar tarea: DELETE /tasks/:id 
- Si todo sale bien, deberias ver los datos de la tarea reflejados en tiempo real.

