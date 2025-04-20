const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Middleware para JSON
app.use(bodyParser.json());

// Rutas
const postRoute = require('./routes/post');
const userRoute = require('./routes/user'); // nuevo archivo para login/registro

app.use('/servicios', postRoute);
app.use('/auth', userRoute); // rutas de autenticación

// Ruta base
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Conexión a MongoDB
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/miBaseDeDatos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connectToDB();

// Iniciar servidor
app.listen(10000, () => {
    console.log('Server is running on port 10000');
});
