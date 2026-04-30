Este proyecto es una aplicación web de e-commerce desarrollada para la Tecnicatura Universitaria en Programación (UTN FRCU). Consiste en una plataforma integral para la gestión y comercialización de productos con arquitectura moderna.
Tecnologías
Frontend: React.
Backend: Node.js con Express.js.
Base de Datos: MongoDB con Mongoose.
Arquitectura: API REST con organización modular.
 Instalación y Configuración

1 clonar el git
git clone https://github.com/nicorromero/Web_FullStack.git
cd Web_FullStack 
2 Configuración de la Base de Datos (MongoDB)
.env en la carpeta raíz del servidor (donde se encuentre tu index.js o app.js).

Agrega tu cadena de conexión de MongoDB Atlas o local:
Fragmento de código
MONGO_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/nombre_bd
PORT=5000
3 Levantar el backend - servidor 
# Entrar a la carpeta del servidor 
cd servidor 
npm install 
npm run dev 
4. Levantar el Frontend (Cliente)
Bash
# Entrar a la carpeta del cliente en una nueva terminal
cd cliente
npm install
npm start
El código está organizado siguiendo patrones de diseño que separan las responsabilidades:
Models: Definición de esquemas de Mongoose.
Controllers: Lógica de negocio y manejo de peticiones.
Routes: Definición de los endpoints de la API REST. 
Middleware: Validaciones de datos y control de acceso por roles.
