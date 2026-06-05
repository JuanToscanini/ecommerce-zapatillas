// 1. Importamos Mongoose y las variables de entorno para conectarnos a la Base de Datos
const mongoose = require('mongoose');
require('dotenv').config(); // Asegurate de tener dotenv instalado

// 2. Importamos Faker y TU modelo de producto
const { faker } = require('@faker-js/faker');
const Product = require('./models/product.model.js'); // <-- Verificá que esta ruta apunte bien a tu modelo

// 3. Creamos una función asíncrona porque la conexión a DB toma tiempo
const seedDatabase = async () => {
    try {
        // Conectamos a Mongo usando tu variable de entorno (la misma que usa tu server.js)
        await mongoose.connect(process.env.MONGO_URI);
        console.log(' Conectado a MongoDB...');

        // Opcional: Borramos los 14 productos viejos para arrancar de cero
        await Product.deleteMany({});
        console.log('🧹 Base de datos limpiada...');

        const products = [];
        const categoriasValidas = ['hombres', 'mujer', 'ninos'];
        
        for (let i = 1; i <= 50; i++) {
            const categoriaRandom = categoriasValidas[Math.floor(Math.random() * categoriasValidas.length)];
            products.push({
                // NOTA: Quité el "id: i" porque MongoDB genera el "_id" automáticamente
                name: faker.commerce.productName(),
                price: parseFloat(faker.commerce.price({ min: 10, max: 200 })),
                description: faker.commerce.productDescription(),
                stock: faker.number.int({ min: 0, max: 100 }),
                category: categoriaRandom,
                image: faker.image.urlLoremFlickr({ category: 'shoes', width: 500, height: 500 }),
                active: true
            });
        }

        // Insertamos los 50 productos de golpe en la base de datos
        await Product.insertMany(products);
        console.log(' ¡Seeding completado! 50 productos falsos en MongoDB.');

        // Cerramos la conexión y terminamos el script
        mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error(' Error al sembrar la base de datos:', error);
        process.exit(1);
    }
};

// Ejecutamos la función
seedDatabase();