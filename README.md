# entregaFinal-backend
## Consigna

Desarrollarás el backend de una aplicación de e-commerce para poder vender productos de un rubro a elección.

## Inicializacion:
- completar los campos de ".env", ejemplificado en el archivo .env.template.
- iniciar desde la carpeta "src" con el comando "npm start" para iniciar el servidor.

## Caracteristicas principales
- Framework Express.
- Servidor configurable (puerto, modo cluster o fork, mongoDataBase, etc).
- Estructura de capas DAO / DTO / Controller / Routes / Views / Server.
- Persistencia en MongoDB.
- Manejo de session con Passport-Local y Passport-JWT.
- Canal de chat implementado con Websocket(probado por postman).
- Aviso por email al administrador.

## Config
Se configura y exporta la app express, rutas a utilizar,ruta de logout, y la configuracion de websocket.

## Rutas
(las rutas iniciales estan configuradas en appConfig, junto con toda la configuracion de app, y "/logout")
### Session

- GET: "/" trae todos los usuarios y renderiza la vista de 'signup-login'.
- POST: "/signup" Recibe usuario y clave, crea usuario en db y redirije a lista de productos.
- POST: "/login" Compara datos ingresados con db, si coincide redirije a lista de productos, sino lanza error.
- GET: "/info" - Muestra informacion de servidor.

### Product
- GET: "/" Trae productos de db y renderiza la vista
- POST: "/" Trae los datos de los productos seleccionados y crea el carrito.
- GET: "/admin" Renderiza la vista para agregar un producto.
- POST: "/admin" Guarda el producto en db.
- GET: "/:id" Devuelve producto por params.id.
- GET: "/category/:category" Devuelve lista de productos por params.category.
- PUT: "/:id" Actualiza los datos de producto por id.
- DELETE: "/:id" Elimina producto por params.id.

### Cart
- GET: "/" Devuelve el carrito del usuario.
- POST: "/order" Crea la orden y envia mail a administrador.
- DELETE: "/:id" Elimina el producto del carrito por params.id.
- DELETE: "/:id/:title" Elimina el carrito.

### Chat

- GET: "/" Trae formulario para enviar mensaje.
- GET: "/:username" Devuelve todos los mensajes de chat del usuario por params.
- POST: "/:username/:msg" agrega un nuevo mensaje al chat del usuario.

## Controller
Se encuentra la configuracion (dao, dto y controller) para usuarios, productos, carritos, chats y ordenes de compra, pudiendo crear, actualizar, buscar o borrar cada uno de los mismos.

## Helpers

Se encuentra la configuracion de envio de mail.

## Views
Esquemas y plantillas realizadas con handlebars, para generar la vista frontEnd.
