// Defición del modelo de usuario
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
const UserSchema = new mongoose.Schema({
    // Definición de los campos del modelo
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
