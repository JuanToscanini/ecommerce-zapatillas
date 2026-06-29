# Iron Step — E-commerce de Zapatillas

Aplicación web full stack desarrollada para la Tecnicatura Universitaria en Programación (UTN FRCU), cátedra Programación IV. Plataforma de e-commerce con autenticación, gestión de productos, carrito de compras, órdenes y panel de administración.

## Tecnologías

- **Frontend:** React (Vite), React Router, Axios, react-toastify, react-icons
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcrypt, nodemailer, cors, dotenv
- **Arquitectura:** API REST modular (rutas / controladores / modelos / middlewares)

## Estructura del repositorio

```
Web_FullStack/
├── Backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── middlewares/
│   ├── scripts/
│   │   └── products.js
│   └── .env
└── Frontend/
    ├── src/
    └── .env
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/nicorromero/Web_FullStack.git
cd Web_FullStack
```

### 2. Backend

```bash
cd Backend
npm install
```

Crear un archivo `.env` dentro de `Backend/` con las siguientes variables:

```dotenv
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tienda
JWT_SECRET=una_clave_secreta_larga_y_random
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_app_password_de_gmail
MAIL_FROM=tu_correo@gmail.com
```

Levantar el servidor:

```bash
npm run dev
```

El backend queda disponible en `http://localhost:3000`.

### 3. Frontend

En una terminal nueva:

```bash
cd Frontend
npm install
```

Crear un archivo `.env` dentro de `Frontend/` con:

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

Levantar la aplicación:

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:5173` (puerto por defecto de Vite).

### 4. Poblar la base de datos (opcional)

Para cargar productos de prueba con imágenes reales:

```bash
cd Backend
node scripts/products.js
```

> ⚠️ Este script borra todos los productos existentes y los reemplaza por los generados a partir del array `PRODUCT_IMAGES`.

## Variables de entorno

### Backend (`.env`)

| Variable | Descripción |
|---|---|
| `MONGO_URI` | Cadena de conexión a MongoDB Atlas |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `PORT` | Puerto del servidor backend |
| `SMTP_HOST` | Servidor SMTP (Gmail) |
| `SMTP_PORT` | Puerto SMTP |
| `SMTP_USER` | Cuenta de Gmail usada para enviar correos |
| `SMTP_PASS` | App Password de Gmail |
| `MAIL_FROM` | Dirección remitente de los correos |
| `FRONTEND_URL` | URL del frontend en producción, usada para configurar CORS (ej: `https://programacioniv.vercel.app`) |

### Frontend (`.env`)

| Variable | Descripción |
|---|---|
| `VITE_API_BASE_URL` | URL base del backend |

## Arquitectura del código

- **Models:** esquemas de Mongoose (Usuario, Producto, Carrito, Orden/Sale)
- **Controllers:** lógica de negocio y manejo de peticiones
- **Routes:** definición de endpoints de la API REST
- **Middlewares:** autenticación JWT y autorización por roles (admin / cliente)

## Roles

- **Cliente:** registro, login, carrito, checkout, ver sus propias órdenes, editar su perfil.
- **Administrador:** gestión completa de productos y usuarios (CRUD + baja lógica + reactivación), gestión de órdenes (ver, cambiar estado, eliminar).

## Documentación adicional

La documentación completa de requerimientos funcionales y endpoints (método, ruta, parámetros, respuestas) se encuentra en el PDF de entrega final adjunto.
